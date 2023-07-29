import http from 'k6/http'
import {sleep} from "k6"
export let options={
    vus : 10000,
    duration :'30s'
}
const BASE_URL="http://localhost:4000/events/benchmark"
export default function(){
    let geturl=BASE_URL
    http.post(geturl);
    
}