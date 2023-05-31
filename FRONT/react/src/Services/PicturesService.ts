import axios from "axios";
import PictureModel from "../Models/PictureModel";
import { PicturesActionType, picturesStore } from "../redux/PicturesState";
import config from "../Utils/Config";



class PicturesService {

    public async fetchAllPictures(page:number=1,category:string=" "): Promise<PictureModel[]> {
      
        let pictures = picturesStore.getState().pictures;

        if (pictures.length === 0 || category !== " ") {
            const response = await axios.get<PictureModel[]>(config.picturesUrl , {params:{'page':page,'perPage':9,'category':category!=='ALL'?category:" "}});
            pictures = response.data;
            picturesStore.dispatch({ type: PicturesActionType.FetchAllPictures, payload: pictures })
        }

        return pictures;
    }
}
const picturesService = new PicturesService();
export default picturesService  ;
