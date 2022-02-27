import {Service} from "typedi";
import got, {Got} from "got";

@Service()
export default class GotInstance {

    public instance: Got;

    public constructor() {
        this.instance = got.extend({
            headers: {
                Accept: '*/*',
            },
        });
    }

}