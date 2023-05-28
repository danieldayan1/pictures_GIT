class Config {
    public supportEmail = "support@northwind.com";
    public supportPhone = "031234567";
    public supportPage = "";

    // public productsUrl = "http://localhost:3030/api/products/";
    // public productsUrl = "http://127.0.0.1:8000/products/"
    // public productImagesUrl = "http://localhost:3030/api/products/images/";
    // public registerUrl = "http://localhost:3030/api/auth/register/";
    // public loginUrl = "http://localhost:3030/api/auth/login/"

    public picturesUrl = "https://pixabay.com/api/?key=25540812-faf2b76d586c1787d2dd02736&q=${CATEGORY}"

}

const config = new Config();

export default config;
