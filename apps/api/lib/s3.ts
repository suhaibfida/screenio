import {S3Client} from "@aws-sdk/client-s3"
import "dotenv/config"
const region=process.env.AWS_REGION;
const secretId=process.env.AWS_SECRET_ID;
const secretKey=process.env.AWS_SECRET_KEY;
try{
    if(!region || !secretId || !secretKey){
        throw new Error("AWS credentials empty")
    }
const client=new S3Client({
            region:region,
            credentials:{
                accessKeyId:secretId,
                secretAccessKey:secretKey
            }

})}
catch(err){
    console.error(err)
}