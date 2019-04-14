const __dirname = path.dirname(new URL(import.meta.url).pathname);
import path from 'path';
import fs from 'fs';
import request from 'request-promise';
import dialogs_config from './configs/dialogs';

(async () => {

    const result_dir = path.resolve(__dirname, './images/result')
        , images = fs.readdirSync(result_dir).filter((name) => name.search(/\.(gif|jpg|jpeg|tiff|png|bmp)$/i) !== -1)
    ;

    for (let image_name of images) {

        const buffer = fs.readFileSync(`${result_dir}/${image_name}`)
            , parsed_name = path.parse(image_name)
        ;

        let result = await request.post({
            url: `https://dialogs.yandex.net/api/v1/skills/${dialogs_config.skill_id}/images`,
            headers: {
                'Authorization': `OAuth ${dialogs_config.token}`
            },
            formData: {
                file: {
                    value: buffer,
                    options: {
                        filename: parsed_name.base
                    }
                }
            },
            json: true
        });

        console.log({ [parsed_name.base]: result });
    }

})();
