import * as uuid from "uuid";
import * as path from "path";

class FileService {
  saveFiles(files) {
    try{
      if(!files.length) {
        const fileName = uuid.v4() + '.jpg';
        const filePath = path.resolve("public", fileName);
        files.mv(filePath);
        return fileName;
      } else {
        let filesName = [];
        for(let i = 0; i < files.length; i += 1) {
          const name = uuid.v4() + '.jpg';
          const pathFile = path.resolve("public", name);
          files[i].mv(pathFile);
          filesName.push(name);
        }
        return filesName;
      }
    } catch (err) {
      console.log(err);
    }
  }
}

export default new FileService();
