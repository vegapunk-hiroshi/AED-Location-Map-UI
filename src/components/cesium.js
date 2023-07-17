import { Ion, Viewer, KmlDataSource, 
    ImageryLayer, OpenStreetMapImageryProvider} from "cesium";

const cesiumViewer = async () => {
    // Grant CesiumJS access to your ion assets
    Ion.defaultAccessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJiYzM4YTAzNS00MDI0LTRiYWQtODgxNy03ZGJlOWE2M2Q1YzciLCJpZCI6MTUxMTQ4LCJpYXQiOjE2ODg0MzM4MTR9.HwJ6PUcGbJx5lhBbgk92KTfviWtgJvY4JocmtNYediU";

    const viewer = new Viewer("cesiumContainer", {
        baseLayer: new ImageryLayer(new OpenStreetMapImageryProvider({
            url : 'https://a.tile.openstreetmap.org/'
        })),
    });

    // AED location opendata for each ward in Sendai
    // let kmlIds = [1934994, 1939935, 1939936, 1939937, 1940090];
    const KMLBasePath = "./assets/SendaiCityOpenData/AED_installed_facilities/"
    let kmlPaths = ["aed_aoba_20221223.kml", "aed_izumi_20221223.kml", "aed_miyagino_20221223.kml", "aed_taihaku_20221223.kml", "aed_wakabayashi_20221223.kml"];

    const loadKml = async (path) => {
        
        const dataSource = await KmlDataSource.load(path, {
            camera: viewer.scene.camera,
            canvas: viewer.scene.canvas,
        });
        const obj = await viewer.dataSources.add(dataSource);
        await viewer.zoomTo(obj);
    };

    try {
        await kmlPaths.forEach(kmlPath => {
            loadKml(KMLBasePath + kmlPath);
        });
    } catch (error) {
        console.log(error);
    }
}
export default cesiumViewer;