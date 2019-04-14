const __dirname = path.dirname(new URL(import.meta.url).pathname);
import path from 'path';
import fs from 'fs';
import jimp from 'jimp';
import sizes from './configs/sizes';

(async () => {

    const default_dir = path.resolve(__dirname, './images/default')
        , result_dir = path.resolve(__dirname, './images/result')
        , images = fs.readdirSync(default_dir).filter((name) => name.search(/\.(gif|jpg|jpeg|tiff|png|bmp)$/i) !== -1)
    ;

    for (let image_name of images) {

        const buffer = fs.readFileSync(`${default_dir}/${image_name}`)
            , parsed_name = path.parse(image_name)
        ;

        for (let ratio in sizes) {

            const size = sizes[ratio]
                , new_image_name = parsed_name.name + '-' + ratio + parsed_name.ext
            ;

            let image = await jimp.read(buffer);

            image.contain(size.width, size.height).background(0xFFFFFFFF).normalize();

            fs.writeFileSync(`${result_dir}/${new_image_name}`, await image.getBufferAsync(jimp.AUTO));

            console.log(new_image_name);
        }

        console.log('----------------------------');
    }

})();
