import { Ion, Viewer, KmlDataSource, Math,
    ImageryLayer, OpenStreetMapImageryProvider,
Cartesian3, Cartographic, ScreenSpaceEventType, GeoJsonDataSource,
ScreenSpaceEventHandler, SceneMode, Color, DataSourceCollection} from "cesium";
import axios from "axios";
import { data } from "autoprefixer";

const scanxapi = axios.create({
    baseURL: 'http://127.0.0.1:8000'
  });

const initViewer = async () => {
    // Grant CesiumJS access to your ion assets
    Ion.defaultAccessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJiYzM4YTAzNS00MDI0LTRiYWQtODgxNy03ZGJlOWE2M2Q1YzciLCJpZCI6MTUxMTQ4LCJpYXQiOjE2ODg0MzM4MTR9.HwJ6PUcGbJx5lhBbgk92KTfviWtgJvY4JocmtNYediU";

    const viewer = new Viewer("cesiumContainer", {
        sceneMode: SceneMode.SCENE2D,
        // baseLayerPicker: false,
        // baseLayer: ImageryLayer.fromWorldImagery(),
        baseLayer: new ImageryLayer(new OpenStreetMapImageryProvider({
            url : 'https://a.tile.openstreetmap.org/'
        })),
        animation: false,
        homeButton: false,
        fullscreenButton: false,
        infoBox: false,
        sceneModePicker: false,
        selectionIndicator: false,
        timeline: false,
        navigationHelpButton: false,
        navigationInstructionsInitiallyVisible: false,
        clockViewModel: null
        
    });
    return viewer
}

const showKml = async (viewer, currentLocation) => {
    console.log('start show kml')

    let locations = await scanxapi.get('/locations');
    // console.log(locations)
    console.log(locations.data);

    // let datasource = new DataSourceCollection();

    locations.data.forEach((loc) => {
        addPoint(viewer, loc);
    });
    await viewer.zoomTo(viewer.entities);
}

const zoomToCurrentLocation = (viewer, latlon) => {
    viewer.camera.flyTo({
        destination: Cartesian3.fromDegrees(latlon.longitude, latlon.latitude, 5),
        duration: 0.5
      });
}

const addPoint = (viewer, place_mark) => {
    const cartesian = Cartographic.toCartesian(new Cartographic(
        Math.toRadians(place_mark.longitude),
        Math.toRadians(place_mark.latitude),
        0
    ));
    viewer.entities.add({
        position: cartesian,
        point: {
            pixelSize: 10,
            color: place_mark.style === '#icon-101'? Color.RED : Color.BLUE
        }
    });
}

const showPathToAED = async (viewer, location) => {
    const longitude = location.longitude;
    const latitude = location.latitude;
    const queryPath = '/closest/?longitude=' + longitude + '&latitude=' + latitude;
    let closest = await scanxapi.get(queryPath);
    console.log('closest', closest, closest.status);
    console.log('data', closest.data);
    if(closest.status == 200) {
        const dataSource = GeoJsonDataSource.load(closest.data);
        viewer.dataSources.add(dataSource);
        viewer.zoomTo(dataSource);
        let cartesians = [];
        
        closest.data.coordinates.forEach((lonlat)=>{
            // console.log(lonlat)
            cartesians.push(Cartesian3.fromDegrees(lonlat[0], lonlat[1]));
        });
        viewer.entities.add({
            polyline: {
                positions: cartesians,
                width: 2,
                material: Color.RED,
                clampToGround: true,
              },
        });
    }


}


export {initViewer, showKml, zoomToCurrentLocation, showPathToAED};
