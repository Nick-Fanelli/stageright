import { v4 as uuidv4 } from 'uuid';

export const generateAssetUUID = () : string => {

    return uuidv4().split("-")[0];

}