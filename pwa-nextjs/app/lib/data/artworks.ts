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
  history: string | null
};

export async function getVAMArtworkById(artworkId: string) {
  try {
    const vamResponse: AxiosResponse = await vam.get(
      `museumobject/${artworkId}`
    );
    console.log ("vamResponse", vamResponse.data.record.images[0])
    const artwork: Artwork = {
      artworkId: vamResponse.data.record.systemNumber,
      title: vamResponse.data.record.titles[0].title,
      artist: vamResponse.data.record.artistMakerPerson.length
        ? vamResponse.data.record.artistMakerPerson[0].name.text
        : "Unknown",
      imageURL: `https://framemark.vam.ac.uk/collections/${vamResponse.data.record.images[0]}/full/full/0/default.jpg`,
      description: vamResponse.data.record.briefDescription,
      history: vamResponse.data.record.objectHistory.length ? vamResponse.data.record.objectHistory : vamResponse.data.record.historicalContext
    };
    console.log(artwork.description)
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

    const [artsyResponse, artist] = await Promise.all([artsy.get(`artworks/${artworkId}`, config), artsy.get(`artists?artwork_id=${artworkId}`, config)]);
    return {
      artworkId: artsyResponse.data.id,
          title: artsyResponse.data.title,
          artist: artist.data._embedded.artists[0].name,
          imageURL: artsyResponse.data._links.image.href.replace("{image_version}", "large"),
          description: artsyResponse.data.category + " - " + artsyResponse.data.medium + " - " + artsyResponse.data.collecting_institution,
          history: null
    }
  } catch (err) {
    console.log(err);
  }
}

export async function getVAMArtworks(page: number, searchValue: string) {
  // console.log(page, "VAM page")
  try {
    const vamQueryStart = `search?`
    const vamSearchQuery = searchValue ? `q=${searchValue}&` : ""; 
    const vamBasicQuery = `search?q_object_type='painting'&images_exist=1&image_restrict=2&page_size=20&page=${page}`; //add in offset to get next page
    const vamResponse: AxiosResponse = await vam.get(`objects/${vamQueryStart}${vamSearchQuery}${vamBasicQuery}`);
    // console.log(vamResponse.data, "vamResponse")
    const vamArtworks: Artwork[] = vamResponse.data.records.map(
      (record: any) => {
        // console.log(record._primaryMaker, "record")
          return {
            artworkId: record.systemNumber,
            title: record._primaryTitle,
            artist: Object.keys(record._primaryMaker).length
              ? record._primaryMaker.name
              : "Unknown",
            imageURL: `https://framemark.vam.ac.uk/collections/${record._primaryImageId}/full/full/0/default.jpg`,
            description: null,
            history: null
          };
      }
    );
    console.log(vamArtworks, "vamArtworks");
    console.log(vamResponse.data)
    const pages = vamResponse.data.info.pages
    return {artworks: vamArtworks, pages: pages}
  } catch (err) {
    console.log(err);
  }
}

export async function getArtsyArtworks(page: number) {
  const config = {
    headers: {
      "X-XAPP-Token": process.env.NEXT_PUBLIC_ARTSY_API_KEY,
    },
  };
  try {
    const artsyQuery = `?size=20&offset=${(page-1)*20}`;  //add in offset to get next page
    const artsyResponse: AxiosResponse = await artsy.get(`artworks${artsyQuery}`, config);
    const artsyArtworks: Artwork[] = artsyResponse.data._embedded.artworks.map(
      (artwork: any) => {
        return {
          artworkId: artwork.id,
          title: artwork.title,
          artist: null,
          imageURL: artwork._links.thumbnail.href,
          description: null,
          history: null
        };
      }
    );

    return {artworks: artsyArtworks}
  } catch (err) {
    console.log(err);
  }
}
