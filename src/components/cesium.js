import { Ion, IonResource, Viewer, KmlDataSource, Color} from "cesium";

const cesiumViewer = async () => {
    // Grant CesiumJS access to your ion assets
    Ion.defaultAccessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJiYzM4YTAzNS00MDI0LTRiYWQtODgxNy03ZGJlOWE2M2Q1YzciLCJpZCI6MTUxMTQ4LCJpYXQiOjE2ODg0MzM4MTR9.HwJ6PUcGbJx5lhBbgk92KTfviWtgJvY4JocmtNYediU";

    const viewer = new Viewer("cesiumContainer");

    // AED location opendata for each ward in Sendai
    let kmlIds = [1934994, 1939935, 1939936, 1939937, 1940090];
    let zoomTargetDataSource;

    const loadKml = async (id) => {
        const resource = await IonResource.fromAssetId(id);//1934994
        const dataSource = await KmlDataSource.load(resource, {
            camera: viewer.scene.camera,
            canvas: viewer.scene.canvas,
        });
        const obj = await viewer.dataSources.add(dataSource);
        await viewer.zoomTo(dataSource);
        const billboards = obj._primitives._primitives[0]._billboardCollection._billboards;
        const positions = billboards.map((e) => e._position);
        positions.forEach((p) => {
            viewer.entities.add({
              position: p,
              billboard: {
                image: "./AED_Logo_USA.jpg",
                // scale: 1,
                width: 20, // default: undefined
                height: 20, // default: undefined
              }
            });
          });
    };

    try {
        await kmlIds.forEach(id => {
            loadKml(id);
        });
    } catch (error) {
        console.log(error);
    }
}
export default cesiumViewer;