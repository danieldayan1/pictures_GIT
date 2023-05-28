import axios from "axios";
import PictureModel from "../Models/PictureModel";
import { PicturesActionType, picturesStore } from "../redux/PicturesState";
import config from "../Utils/Config";



class PicturesService {

    public async fetchAllPictures(): Promise<PictureModel[]> {

        let pictures = picturesStore.getState().pictures;

        if (pictures.length === 0) {
            const response = await axios.get<PictureModel[]>(config.picturesUrl);
            pictures = response.data;
            picturesStore.dispatch({ type: PicturesActionType.FetchAllPictures, payload: pictures })
        }

        return pictures;
    }

    public async getOnePictureById(id: string): Promise<PictureModel> {

        let pictures = picturesStore.getState().pictures
        
        let picture =  pictures.find((p:PictureModel) => p.id === id);
        
        if (!picture) {
            const response = await axios.get<PictureModel>(config.picturesUrl +','+ id); 
            picture = response.data;
        }
        
        return picture;
    }

    public async getOnePictureByCategory(category:number):Promise<PictureModel[]>{

        let pictures = picturesStore.getState().pictures
        let products_category =  pictures.filter((p:PictureModel) => p.category === category);
        
        if (products_category.length == 0 || category == 0 ) {
            return pictures
        }
        return products_category
    }

}
const picturesService = new PicturesService();
export default picturesService  ;
