// let url = "192.168.0.146";
let url = "18.142.158.4";
class UrlBuilderHelper {
  api(path) {
    return path;
  }

  coreServiceApi(path) {
    return `http://${url}:5001/api/v1/${path}`;
  }

  jobServiceApi(path) {
    return `http://${url}:5002/api/v1/${path}`;
  }

  resumeServiceApi(path) {
    return `http://${url}:5003/api/v1/${path}`;
  }
  packageServiceApi(path) {
    return `http://${url}:5004/api/v1/${path}`;
  }
  salesServiceApi(path) {
    return `http://${url}:5005/api/v1/${path}`;
  }
  messageServiceApi(path) {
    return `http://${url}:5000/api/v1/${path}`;
  }
}

export const UrlBuilder = new UrlBuilderHelper();
