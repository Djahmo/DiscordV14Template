## Version française

# Instructions pour démarrer le bot Discord

Avant de démarrer le bot, il faut renommer le fichier `.env.dev` en `.env`.

Renseignez les bonnes informations dans le fichier `.env` et dans `config.json`.

Ensuite, exécutez `npm install` pour installer les dépendances nécessaires.

Utilisez `npm run deploy` pour déployer les commandes "/".

Puis, lancez le bot avec `npm start`.

Pour les commandes, `commandInfo` est la description que vous allez voir sur Discord, tandis que `commandDescription` est une seconde description optionnelle que vous pouvez renseigner si vous souhaitez, par exemple, créer une commande `/help` avec des détails sur les commandes.

Pour les tasks et les events, assurez-vous toujours de mettre `client` en premier paramètre, suivi des autres paramètres de votre événement.

Pour configurer les horaires des tâches (schedules de task), vous pouvez vous référer au site [CronTab Guru](https://crontab.guru).

Pour toute question, contactez Djahmo sur le Discord [Hyna](https://discord.gg/hyna).

## English Version

# Instructions to Start the Discord Bot

Before starting the bot, rename the `.env.dev` file to `.env`.

Fill in the correct information in the `.env` file and in `config.json`.

Then, run `npm install` to install the necessary dependencies.

Use `npm run deploy` to deploy the "/" commands.

Finally, start the bot with `npm start`.

For the commands, `commandInfo` is the description you will see on Discord, while `commandDescription` is an optional secondary description you can provide, for instance, if you want to create a `/help` command with more detailed information about other commands.

For tasks and events, always ensure that `client` is the first parameter, followed by the usual parameters of your event.

To configure the task schedules, you can refer to [CronTab Guru](https://crontab.guru).

For any questions, contact Djahmo on the [Hyna](https://discord.gg/hyna) Discord.
