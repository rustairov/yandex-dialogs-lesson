import path from 'path';
import request from 'request-promise';
import jimp from 'jimp';

import dialogs_config from './configs/dialogs';
import sizes from './configs/sizes';

(async () => {

    const image_url = 'http://farm8.static.flickr.com/7925/46542882055_ee71302462_b.jpg'
        , parsed_name = path.parse(image_url)
        , buffer = await request({ url: image_url, encoding: null })
    ;

    for (let ratio in sizes) {

        const size = sizes[ratio]
            , new_image_name = parsed_name.name + '-' + ratio + parsed_name.ext
        ;

        let image = await jimp.read(buffer);

        image.contain(size.width, size.height).background(0xFFFFFFFF).normalize();

        let result = await request.post({
            url: `https://dialogs.yandex.net/api/v1/skills/${dialogs_config.skill_id}/images`,
            headers: {
                'Authorization': `OAuth ${dialogs_config.token}`
            },
            formData: {
                file: {
                    value: await image.getBufferAsync(jimp.AUTO),
                    options: {
                        filename: new_image_name
                    }
                }
            },
            json: true
        });

        console.log({ [new_image_name]: result });
    }

})();
