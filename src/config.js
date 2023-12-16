const config = {
    environment: 'nonprod',
    segmentWriteKey: 'SEGMENT_WRITE_KEY',
    release: 'RELEASE_VERSION',

    cookie_name: 'aed_token',

    env: {
        development: {
            apiUrl: 'http://localhost:8080',
            s3Url: 'xxxx'
        },
        production: {
            broadcastUrl: 'https://echo.prod.cloud.aaa.jp',
            apiUrl: 'https://api.prod.cloud.scanx.jp/api',
            tileSetUrl: 'https://asset.prod.cloud.aaa.jp/static',
            storageUrl: 'https://api.prod.cloud.aaa.jp/storage',
            terrainUrl: 'https://asset.prod.cloud.aaa.jp/',
            shareUrl: 'https://appv2.aaa.jp/share',
            s3Url: 'https://aaa-storage-v2-prod-ap-northeast-1.s3.ap-northeast-1.amazonaws.com'
        },
        // vegapunk/hiroshiy@scanx.jp single sign on
        apiKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJiYzM4YTAzNS00MDI0LTRiYWQtODgxNy03ZGJlOWE2M2Q1YzciLCJpZCI6MTUxMTQ4LCJpYXQiOjE2ODg0MzM4MTR9.HwJ6PUcGbJx5lhBbgk92KTfviWtgJvY4JocmtNYediU"
    },

    get() {
        if (this.environment === 'production') {
            return this.env.production;
        } else if (this.environment === 'development') {
            return this.env.development;
        }
    },
    getApiKey() {
        return this.env.apiKey;
    }
};

export default config;
