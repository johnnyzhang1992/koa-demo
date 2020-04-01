/**
* @Author johnnyzhang1992 
* @Github https://github.com/johnnyzhang1992 
* @Description 腾讯云 API 相关接口
*/
const tencentcloud = require("tencentcloud-sdk-nodejs");
const config = require("../config")

const { tencentSecrectId,tencentSecretKey} = config;
//导入对应产品模块的client models。
const EccClient = tencentcloud.ecc.v20181213.Client;
const models = tencentcloud.ecc.v20181213.Models;

const Credential = tencentcloud.common.Credential;
const ClientProfile = tencentcloud.common.ClientProfile;
const HttpProfile = tencentcloud.common.HttpProfile;

// 实例化一个认证对象，入参需要传入腾讯云账户secretId，secretKey
let cred = new Credential(tencentSecrectId, tencentSecretKey);

// 实例化一个http选项，可选的，没有特殊需求可以跳过。
let httpProfile = new HttpProfile();
httpProfile.reqMethod = "POST";
httpProfile.reqTimeout = 30;
httpProfile.endpoint = "ecc.tencentcloudapi.com";

// 实例化一个client选项，可选的，没有特殊需求可以跳过。
let clientProfile = new ClientProfile();
clientProfile.signMethod = "HmacSHA256";
clientProfile.httpProfile = httpProfile;

// 实例化要请求产品的client对象。clientProfile可选。
let client = new EccClient(cred, "", clientProfile);

// 实例化一个请求对象,并填充参数
req = new models.EHOCRRequest();
req.InputType = 1;
req.Image = "";

// 通过client对象调用想要访问的接口，需要传入请求对象以及响应回调函数
client.EHOCR(req, function (err, response) {
    if (err) {
        console.log(err);
        return;
    }
    // 请求正常返回，打印response对象
    console.log(response.to_json_string());
});
