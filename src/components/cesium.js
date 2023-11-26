import { Ion, Viewer, KmlDataSource, 
    ImageryLayer, OpenStreetMapImageryProvider,
Cartesian3, Cartographic, ScreenSpaceEventType, 
ScreenSpaceEventHandler} from "cesium";
import { vi } from "vitest";

const initViewer = async () => {
    // Grant CesiumJS access to your ion assets
    Ion.defaultAccessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJiYzM4YTAzNS00MDI0LTRiYWQtODgxNy03ZGJlOWE2M2Q1YzciLCJpZCI6MTUxMTQ4LCJpYXQiOjE2ODg0MzM4MTR9.HwJ6PUcGbJx5lhBbgk92KTfviWtgJvY4JocmtNYediU";

    const viewer = new Viewer("cesiumContainer", {
        baseLayer: new ImageryLayer(new OpenStreetMapImageryProvider({
            url : 'https://a.tile.openstreetmap.org/'
        })),
    });

    return viewer
}

const showKML = async () => {

    // AED location opendata for each ward in Sendai
    // let kmlIds = [1934994, 1939935, 1939936, 1939937, 1940090];
    const KMLBasePath = "./assets/SendaiCityOpenData/AED_installed_facilities/"
    let kmlPaths = ["aed_aoba_20221223.kml", "aed_izumi_20221223.kml", "aed_miyagino_20221223.kml", "aed_taihaku_20221223.kml", "aed_wakabayashi_20221223.kml"];

    const loadKml = async (path) => {
        
        const dataSource = await KmlDataSource.load(path, {
            camera: viewer.scene.camera,
            canvas: viewer.scene.canvas,
        });
        const objects = await viewer.dataSources.add(dataSource);
        await viewer.zoomTo(objects);
    };

    try {
        await kmlPaths.forEach(kmlPath => {
            loadKml(KMLBasePath + kmlPath);
        });
    } catch (error) {
        console.log(error);
    }

    // TODO: send the clicked location to API that calculates the distance between the POI locations

    // kml datasource
    const filterKml = (kml, mouseCarto) => {  
        // console.log(mouseCarto, kml)
        return kml
    }

    viewer.screenSpaceEventHandler.setInputAction((movement) => {
        const cartesian = viewer.scene.pickPosition(movement.position)
        const mouseCarto = Cartographic.fromCartesian(cartesian);
        const positionArray = viewer.dataSources._dataSources.map(kmlSource => {
            
            let entityArray = kmlSource.entities.values;
            let positionArray = entityArray.map((entity => entity.position))
            console.log(positionArray)
            return positionArray;

        });
        // console.log(entities)
        entities.forEach(kml => {
            filterKml(kml, mouseCarto);
        })
        

    }, ScreenSpaceEventType.LEFT_CLICK);
    // console.log(viewer.entities.values)

    // console.log(viewer.dataSources._dataSources)
}

/**
 *  Hellos
 * @param {*} viewer Viewer
 * @param {*} latlon Object
 */
const zoomToCurrentLocation = (viewer, latlon) => {
    const cartesian = Cartographic.toCartesian(new Cartographic(
        latlon.longitude,
        latlon.latitude
    ))
    viewer.camera.lookAt(cartesian)
}

export {initViewer, showKML, zoomToCurrentLocation};
