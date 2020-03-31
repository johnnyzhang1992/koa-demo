const path = require("path");
const fs = require("fs");

const { uploadPath,filePath } = require("../config");
/**
 * 通用控制器
 */
class CommonController {

    /**
     * 上传文件
     * @param {*} ctx
     */
	async upload(ctx) {
		// 上传单个文件
        const files = ctx.request.files.file; // 获取上传文件
        const filePaths = [];
		for (let file of files) {
			// 创建可读流
            const reader = fs.createReadStream(file.path);
            // 待保存的服务器地址
            let _filePath = path.join(uploadPath) + `/${file.name}`;
            // 实际可访问的地址
            let filePath_ = filePath + `/${file.name}`;
			// 创建可写流
			const upStream = fs.createWriteStream(_filePath);
			// 可读流通过管道写入可写流
            reader.pipe(upStream);
            filePaths.push(filePath_)
		}
		ctx.body = {
			filePaths,
			message: "上传成功！"
		};
	}
}

module.exports = new CommonController();
