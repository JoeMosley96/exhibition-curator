import { shuffle } from "@/app/utils/utils";
import axios, {
  AxiosResponse,
  AxiosRequestConfig,
  RawAxiosRequestHeaders,
} from "axios";

const vam = axios.create({
  baseURL: "https://api.vam.ac.uk/v2/",
});

const artsy = axios.create({
  baseURL: "https://api.artsy.net/api/",
});

export type Artwork = {
  artworkId: string;
  title: string;
  artist: string | null;
  imageURL: string;
  description: string | null;
  history: string | null;
};

export async function getVAMArtworkById(artworkId: string) {
  try {
    const vamResponse: AxiosResponse = await vam.get(
      `museumobject/${artworkId}`
    );
    console.log("vamResponse", vamResponse.data.record.images[0]);
    const artwork: Artwork = {
      artworkId: vamResponse.data.record.systemNumber,
      title: vamResponse.data.record.titles[0].title,
      artist: vamResponse.data.record.artistMakerPerson.length
        ? vamResponse.data.record.artistMakerPerson[0].name.text
        : "Unknown",
      imageURL: `https://framemark.vam.ac.uk/collections/${vamResponse.data.record.images[0]}/full/full/0/default.jpg`,
      description: vamResponse.data.record.briefDescription,
      history: vamResponse.data.record.objectHistory.length
        ? vamResponse.data.record.objectHistory
        : vamResponse.data.record.historicalContext,
    };
    console.log(artwork.description);
    return artwork;
  } catch (err) {
    console.log(err);
  }
}

export async function getArtsyArtworkById(artworkId: string) {
  const config = {
    headers: {
      "X-XAPP-Token": process.env.NEXT_PUBLIC_ARTSY_API_KEY,
    },
  };
  try {
    const [artsyResponse, artist] = await Promise.all([
      artsy.get(`artworks/${artworkId}`, config),
      artsy.get(`artists?artwork_id=${artworkId}`, config),
    ]);
    return {
      artworkId: artsyResponse.data.id,
      title: artsyResponse.data.title,
      artist: artist.data._embedded.artists[0].name,
      imageURL: artsyResponse.data._links.image.href.replace(
        "{image_version}",
        "large"
      ),
      description:
        artsyResponse.data.category +
        " - " +
        artsyResponse.data.medium +
        " - " +
        artsyResponse.data.collecting_institution,
      history: null,
    };
  } catch (err) {
    console.log(err);
  }
}

export async function getVAMArtworks(page: number, searchValue: string) {
  try {
    const vamQueryStart = `search?`;
    const vamSearchQuery = searchValue ? `q=${searchValue}&` : "";
    const vamBasicQuery = `search?q_object_type='painting'&images_exist=1&image_restrict=2&page_size=20&page=${page}`; //add in offset to get next page
    const vamResponse: AxiosResponse = await vam.get(
      `objects/${vamQueryStart}${vamSearchQuery}${vamBasicQuery}`
    );
    const vamArtworks: Artwork[] = vamResponse.data.records.map(
      (record: any) => {
        return {
          artworkId: record.systemNumber,
          title: record._primaryTitle,
          artist: Object.keys(record._primaryMaker).length
            ? record._primaryMaker.name
            : "Unknown",
          imageURL: `https://framemark.vam.ac.uk/collections/${record._primaryImageId}/full/full/0/default.jpg`,
          description: null,
          history: null,
        };
      }
    );
    const pages = vamResponse.data.info.pages;
    return { artworks: vamArtworks, pages: pages };
  } catch (err) {
    console.log(err);
  }
}

export async function getAllArtsySearchResults(searchValue: string) {
  const config = {
    headers: {
      "X-XAPP-Token": process.env.NEXT_PUBLIC_ARTSY_API_KEY,
    },
  };
  try {
    if (searchValue) {
      let searchedArtsyResults = [];
      let offset = 0;
      let searchAgain = true;
      while (searchAgain) {
        await timeout(100);
        const artsyRequest = `search?offset=${offset}&q=${searchValue}`;
        const artsyResponse: AxiosResponse = await artsy.get(
          artsyRequest,
          config
        );
        if (artsyResponse.data._embedded.results.length) {
          console.log("inside if block", offset);
          console.log(artsyResponse.data._embedded.results)
          const tenArtsyResults: Artwork[] =
            artsyResponse.data._embedded.results.map((result: any) => {
              if (result.type === "artwork") {
                const artworkLink = result._links.self.href;
                return {
                  artworkId: artworkLink.substring(artworkLink.lastIndexOf("/") + 1),
                  title: result.title,
                  artist: null,
                  imageURL: result._links.thumbnail.href,
                  description: null,
                  history: null,
                };
              }
            });
          searchedArtsyResults.push(...tenArtsyResults);
          offset++;
          if (tenArtsyResults.length < 10 || offset >= 40) {
            searchAgain = false;
          }
        }
      }
      const filteredArtsyResults = searchedArtsyResults?.filter((element,index) => {
        return element !== undefined
      });
      const uniqueArtsyResults = filteredArtsyResults.filter((element, index) => {
        const _element = JSON.stringify(element);
        return index === filteredArtsyResults.findIndex(obj => {
          return JSON.stringify(obj) === _element;
        });
      });
      console.log(filteredArtsyResults, "filteredArtsyResults")
      console.log(uniqueArtsyResults, "uniqueArtsyResults")
      const numberofPages = Math.ceil(uniqueArtsyResults.length / 20);
      return { artworks: uniqueArtsyResults, pages: numberofPages };
    }
  } catch (err) {
    console.log(err);
  }
}

export function getArtsySearchResultsPage(
  artsyResults: Artwork[],
  page: number
) {
  console.log("pagination file is working")
  console.log(artsyResults.length, "full results length")
  console.log(artsyResults.slice((page - 1) * 20, page*20))
  return { artworks: artsyResults.slice((page - 1) * 20, page*20) };
}

export async function getArtsyArtworks(page: number, searchValue: string) {
  const config = {
    headers: {
      "X-XAPP-Token": process.env.NEXT_PUBLIC_ARTSY_API_KEY,
    },
  };
  try {
    const artsyRequest = `artworks?size=20&offset=${(page - 1) * 20}`;
    const artsyResponse: AxiosResponse = await artsy.get(artsyRequest, config);
    console.log(artsyResponse.data);
    const artsyArtworks: Artwork[] = artsyResponse.data._embedded.artworks.map(
      (artwork: any) => {
        return {
          artworkId: artwork.id,
          title: artwork.title,
          artist: null,
          imageURL: artwork._links.thumbnail.href,
          description: null,
          history: null,
        };
      }
    );
    return { artworks: artsyArtworks, pages: 10 };
  } catch (err) {
    console.log(err);
  }
}

function timeout(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
