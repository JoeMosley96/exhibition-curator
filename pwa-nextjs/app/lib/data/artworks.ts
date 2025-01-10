import axios, {
  AxiosResponse,
  AxiosRequestConfig,
  RawAxiosRequestHeaders,
} from "axios";


const vam = axios.create({
    baseURL: "https://api.vam.ac.uk/v2/"
    })

export type Artwork = {
  artworkId: string;
  title: string;
  artist: string | null;
  imageURL: string;
  description: string | null;
};

export async function getArtworkById(artworkId: string){
    try {
        const vamResponse: AxiosResponse = await vam.get(
            `museumobject/${artworkId}`
        );
        console.log(vamResponse.data);
        const artwork: Artwork = {
            artworkId: vamResponse.data.record.systemNumber,
            title: vamResponse.data.record.titles[0].title,
            artist: vamResponse.data.record.artistMakerPerson.length ? vamResponse.data.record.artistMakerPerson[0].name : null,
            imageURL:  vamResponse.data.meta.images._primary_thumbnail,
            description: vamResponse.data.record.physicalDescription
        }
        console.log("artwork", artwork)
        return artwork
    } catch (err) {
        console.log(err);
    }
}

export async function getArtworks(){
    const queryString = "search?images_exist=1&image_restrict=2"
    try {
        const vamResponse: AxiosResponse = await vam.get(
            `objects/${queryString}`
        );
        console.log(vamResponse.data);
        const artworks: Artwork[] = vamResponse.data.records.map((record: any) => {
            return {
                artworkId: record.systemNumber,
                title: record._primaryTitle.length ? record._primaryTitle : null,
                artist: Object.keys(record._primaryMaker.name).length ? record._primaryMaker.name : null,
                imageURL: record._images._primary_thumbnail,
                description: null
            }
        });
        console.log("artworks", artworks)
        return artworks
    } catch (err) {
        console.log(err);
    }
}

