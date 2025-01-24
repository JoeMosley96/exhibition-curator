import axios, {
  AxiosResponse,
} from "axios";

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
  description: string | null;
  history: string | null;
};

export async function getVAMArtworkById(artworkId: string) {
  try {
    const vamResponse: AxiosResponse = await vam.get(
      `museumobject/${artworkId}`
    );
    const artwork: Artwork = {
      artworkId: vamResponse.data.record.systemNumber,
      title: vamResponse.data.record.titles.length ? vamResponse.data.record.titles[0].title : "Unknown Title",
      artist: vamResponse.data.record.artistMakerPerson.length
        ? vamResponse.data.record.artistMakerPerson[0].name.text
        : "Unknown",
      imageURL: `https://framemark.vam.ac.uk/collections/${vamResponse.data.record.images[0]}/full/full/0/default.jpg`,
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

export async function getChicArtworkById(artworkId: string){
  try{
    const chicResponse: AxiosResponse = await chic.get(
      `artworks/${artworkId}`
    )
    const artwork: Artwork = {
      artworkId: chicResponse.data.data.id,
      title: chicResponse.data.data.title || "Unknown Title",
      artist: chicResponse.data.data.artist_title || "Unknown",
      imageURL: `${chicResponse.data.config.iiif_url}/${chicResponse.data.data.image_id}/full/pct:100/0/default.jpg`,
      description: chicResponse.data.data.short_description || chicResponse.data.data.medium_display,
      history:chicResponse.data.data.description
    };
    return artwork;
  }catch(err){
    console.log(err)
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
    const vamArtworks: Artwork[] = vamResponse.data.records.map(
      (record: VAMRecord) => {
        // console.log(record.systemNumber)
        return {
          artworkId: record.systemNumber,
          title: record._primaryTitle,
          artist: Object.keys(record._primaryMaker).length
            ? record._primaryMaker.name
            : "Unknown Artist",
          imageURL: `https://framemark.vam.ac.uk/collections/${record._primaryImageId}/full/full/0/default.jpg`,
          description: null,
          history: null,
        };
      }
    );
    const pages:number = Number(vamResponse.data.info.pages)
    return { artworks: vamArtworks, pages: pages };
  } catch (err) {
    console.log(err);
  }
}

export async function getChicArtworks(page: number, searchValue: string){

  try{
    const chicQuery = searchValue? `&page=${page}&limit=20&query[exists][field]=image_id` : `?page=${page}&limit=20`
    const chicSearchQuery = searchValue?`/search?q=${searchValue}` : ""
    const chicResponse: AxiosResponse = await chic.get(`artworks${chicSearchQuery}${chicQuery}`)
    const chicArtworks: Artwork[] = await Promise.all(chicResponse.data.data.map(async (artwork: { id: string }) => {
      const fullData = await getChicArtworkById(artwork.id)
      if (fullData) {
        // console.log(fullData.artworkId)
        return {
          artworkId: fullData.artworkId || null,
          title: fullData.title || "Unknown Title",
          artist: fullData.artist || 'Unknown Artist',
          imageURL: fullData.imageURL,
          description: fullData.description || null,
          history: fullData.history || null,
        };
      }
      return null;
    }));
    return {artworks: chicArtworks, pages:chicResponse.data.pagination.total_pages};
  } catch (err) {
    console.log(err);
  }
}

// export async function fetchImageDimensions(imageURL:string){
//   try {
//     const response = await axios.get(imageURL, { responseType: "arraybuffer" });
//     const dimensionsResponse = sizeOf(response.data);
//     const dimensions = ({ width: dimensionsResponse.width, height: dimensionsResponse.height });
//     console.log(imageURL);
//     console.log("Height: " + dimensions.height + ", Width: " + dimensions.width);
//   } catch (error) {
//     console.log(error);
//   }
// }