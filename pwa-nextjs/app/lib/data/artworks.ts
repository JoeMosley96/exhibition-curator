import axios, { AxiosResponse } from "axios";
import { loadImage } from "canvas";

const vam = axios.create({
  baseURL: "https://api.vam.ac.uk/v2/",
});

const chic = axios.create({
  baseURL: "https://api.artic.edu/api/v1/",
});

export type Artwork = {
  artworkId: string;
  title: string;
  artist: string | null;
  imageURL: string;
  imageHeight: number;
  imageWidth: number;
  thumbnailURL: string;
  description: string | null;
  history: string | null;
};

export async function getVAMArtworkById(artworkId: string) {
  try {
    const vamResponse: AxiosResponse = await vam.get(
      `museumobject/${artworkId}`
    );
    const imageURL = `https://framemark.vam.ac.uk/collections/${vamResponse.data.record.images[0]}/full/full/0/default.jpg`;
    const thumbnailURL = `https://framemark.vam.ac.uk/collections/${vamResponse.data.record.images[0]}/full/600,/0/default.jpg`;
    const {height, width} = await loadImage(thumbnailURL)

    const artwork: Artwork = {
      artworkId: vamResponse.data.record.systemNumber,
      title: vamResponse.data.record.titles.length
        ? vamResponse.data.record.titles[0].title
        : "Unknown Title",
      artist: vamResponse.data.record.artistMakerPerson.length
        ? vamResponse.data.record.artistMakerPerson[0].name.text
        : "Unknown",
      imageURL: imageURL,
      thumbnailURL: thumbnailURL || imageURL,
      imageHeight: height,
      imageWidth: width,
      description: vamResponse.data.record.briefDescription,
      history: vamResponse.data.record.objectHistory.length
        ? vamResponse.data.record.objectHistory
        : vamResponse.data.record.historicalContext,
    };

    return artwork;
  } catch (err) {
    console.log(err);
  }
}

export async function getChicArtworkById(artworkId: string) {
  try {
    const chicResponse: AxiosResponse = await chic.get(`artworks/${artworkId}`);
    if (chicResponse.data.data.image_id != null) {
      const imageURL = `${chicResponse.data.config.iiif_url}/${chicResponse.data.data.image_id}/full/pct:100/0/default.jpg`;
      const thumbnailURL = `${chicResponse.data.config.iiif_url}/${chicResponse.data.data.image_id}/full/600,/0/default.jpg`;
      const {height, width} = await loadImage(thumbnailURL)

      const artwork: Artwork = {
        artworkId: chicResponse.data.data.id,
        title: chicResponse.data.data.title || "Unknown Title",
        artist: chicResponse.data.data.artist_title || "Unknown",
        imageURL: imageURL,
        thumbnailURL: thumbnailURL || imageURL,
        imageHeight: height,
        imageWidth: width,
        description:
          chicResponse.data.data.short_description ||
          chicResponse.data.data.medium_display,
        history: chicResponse.data.data.description,
      };
      return artwork;
    } else {
      return null;
    }
  } catch (err) {
    console.log(err);
  }
}

export async function getVAMArtworks(page: number, searchValue: string) {
  type VAMRecord = {
    systemNumber: string;
    _primaryTitle: string;
    _primaryMaker: { name: string };
    _primaryImageId: string;
  };

  try {
    const vamQueryStart = `search?`;
    const vamSearchQuery = searchValue ? `q=${searchValue}&` : "";
    const vamBasicQuery = `search?q_object_type='painting'&images_exist=1&image_restrict=2&page_size=20&page=${page}`; //add in offset to get next page
    const vamResponse: AxiosResponse = await vam.get(
      `objects/${vamQueryStart}${vamSearchQuery}${vamBasicQuery}`
    );
    const vamArtworks: Artwork[] = await Promise.all(
      vamResponse.data.records.map(async (record: VAMRecord) => {
        const imageURL = `https://framemark.vam.ac.uk/collections/${record._primaryImageId}/full/full/0/default.jpg`;
        const thumbnailURL = `https://framemark.vam.ac.uk/collections/${record._primaryImageId}/full/600,/0/default.jpg`;
        const {height, width} = await loadImage(thumbnailURL)
        return {
          artworkId: record.systemNumber,
          title: record._primaryTitle,
          artist: Object.keys(record._primaryMaker).length
            ? record._primaryMaker.name
            : "Unknown Artist",
          imageURL: imageURL,
          thumbnailURL: thumbnailURL || imageURL,
          imageHeight: height,
          imageWidth: width,
          description: null,
          history: null,
        };
      })
    );

    const pages: number = Number(vamResponse.data.info.pages);
    const returnArtworks = vamArtworks.filter((artwork)=>artwork!==null)
    return { artworks: returnArtworks, pages: pages };
  } catch (err) {
    console.log(err);
  }
}

export async function getChicArtworks(page: number, searchValue: string) {
  try {
    const chicSearchQuery = searchValue ? `/search?q=${searchValue}` : "";
    const operator = searchValue ? `&` : `?`;
    const chicQuery = `page=${page}&limit=20&query[exists][field]=image_id`;
    const chicResponse: AxiosResponse = await chic.get(
      `artworks${chicSearchQuery}${operator}${chicQuery}`
    );

    const filteredResponse = chicResponse.data.data.filter(
      (record: { image_id: string | null }) => record.image_id !== null
    );

    const chicArtworks: Artwork[] = await Promise.all(
      filteredResponse.map(async (artwork: { id: string }) => {
        return await getChicArtworkById(artwork.id);
      })
    );

    const returnArtworks = chicArtworks.filter((artwork) => artwork !== null);

    // Ensure unique artworkId
    const uniqueArtworks = Array.from(
      new Map(returnArtworks.map((art) => [art.artworkId, art])).values()
    );

    return {
      artworks: uniqueArtworks,
      pages: chicResponse.data.pagination.total_pages,
    };
  } catch (err) {
    console.log(err);
  }
}



