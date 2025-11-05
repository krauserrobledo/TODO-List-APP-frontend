import { BootstrapContext, bootstrapApplication } from '@angular/platform-browser';
import { App } from './presentation/app/app';
import { config } from './presentation/app/app.config.server';

const bootstrap = (context: BootstrapContext) =>
    bootstrapApplication(App, config, context);

export default bootstrap;
