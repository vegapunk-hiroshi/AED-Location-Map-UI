import { Ion, Viewer, Math, ImageryLayer, Cartesian3, 
    Cartographic, GeoJsonDataSource, SceneMode, Color,
ScreenSpaceEventHandler, ScreenSpaceEventType, 
OpenStreetMapImageryProvider, Scene} from "cesium";
import axios from "axios";
import configuration from "@/config";


const scanxapi = axios.create({
    baseURL: configuration.get().apiUrl
  });

const initViewer = async () => {
    // Grant CesiumJS access to your ion asset
    Ion.defaultAccessToken = configuration.getApiKey();
    const viewer = new Viewer("cesiumContainer", {
        sceneMode: SceneMode.SCENE2D,
        // baseLayerPicker: false,
        baseLayer: ImageryLayer.fromWorldImagery(),
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

const pickLocationMap = (viewer, location) => {

    const handler = new ScreenSpaceEventHandler(viewer.canvas);
    handler.setInputAction((eve)=>{
        const carto = convertPXtoCarto(viewer, eve.position);
        if (carto) showPathToAED(viewer, carto);

    }, ScreenSpaceEventType.LEFT_CLICK);
}

const convertPXtoCarto = (viewer, px) => {
    if (viewer.scene.pickPositionSupported) {
        const cartesian = viewer.camera.pickEllipsoid(px);
        if (cartesian){
            const carto = Cartographic.fromCartesian(cartesian);
            const degrees = {
                'longitude': Math.toDegrees(carto.longitude),
                'latitude': Math.toDegrees(carto.latitude)
            }
            return degrees
        }
    }
}

const showPoints = async (viewer) => {
    let locations = await scanxapi.get('/locations');
    locations.data.forEach((loc) => {
        addPoint(viewer, loc);
    });
    await viewer.zoomTo(viewer.entities);
}

const zoomToCurrentLocation = (viewer, latlon) => {
    viewer.camera.flyTo({
        destination: Cartesian3.fromDegrees(latlon.longitude, latlon.latitude, 50),
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
    const longitude = location.longitude || 135;
    const latitude = location.latitude || 35;
    const queryPath = '/closest/?longitude=' + longitude + '&latitude=' + latitude;
    let closest = await scanxapi.get(queryPath);
    if(closest.status == 200) {
        const dataSource = GeoJsonDataSource.load(closest.data);
        // viewer.dataSources.add(dataSource);
        // viewer.zoomTo(dataSource);
        let cartesians = [];
        
        closest.data.coordinates.forEach((lonlat)=>{
            cartesians.push(Cartesian3.fromDegrees(lonlat[0], lonlat[1]));
        });
        let poly = viewer.entities.add({
            polyline: {
                // show: false,
                positions: cartesians,
                width: 8,
                material: Color.RED,
                clampToGround: true,
              },
        });
        viewer.zoomTo(poly);
    }
}


export {initViewer, showPoints, zoomToCurrentLocation, showPathToAED, pickLocationMap};
