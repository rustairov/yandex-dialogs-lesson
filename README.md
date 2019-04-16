# yandex-dialogs-lesson
Примеры обработки изображений из урока Яндекс.Диалогов

#### Конфигурация
Перед запуском необходимо добавить `dialogs.json` в `./src/configs/` с содержимым:
```json
{
  "skill_id": "<id>",
  "token": "<token>"
}
```

О том как узнать `skill_id` и `token` можно прочитать в [документации](https://tech.yandex.ru/dialogs/alice/doc/resource-upload-docpage/).

#### Запуск
`npm run resize_images` - масштабировать изображения из дериктории `./src/images/default` 

`npm run upload_images` - загрузить изображения из дериктории `./src/images/result` в Яндекс.Диалоги
