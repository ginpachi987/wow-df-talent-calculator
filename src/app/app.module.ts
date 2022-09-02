import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { ChoosePageComponent } from './components/choose-page/choose-page.component';
import { ClassesComponent } from './components/classes/classes.component';
import { ProfessionsComponent } from './components/professions/professions.component';
import { ClassTreeComponent } from './components/classes/class-tree/class-tree.component';
import { ClassTalentComponent } from './components/classes/class-talent/class-talent.component';
import { ImagePipePipe } from './pipes/image-pipe.pipe';
import { TooltipDirective } from './directives/tooltip.directive';
import { TooltipComponent } from './components/tooltip/tooltip.component';
import { ClassListComponent } from './components/class-list/class-list.component';
import { CapitalizePipe } from './pipes/capitalize.pipe';
import { ProfessionListComponent } from './components/profession-list/profession-list.component';
import { ClassConnectorComponent } from './components/classes/class-connector/class-connector.component';
import { ProfessionTabComponent } from './components/professions/profession-tab/profession-tab.component';
import { ProfessionTalentComponent } from './components/professions/profession-talent/profession-talent.component';
import { ProfessionConnectorComponent } from './components/professions/profession-connector/profession-connector.component';
import { PvpListComponent } from './components/classes/pvp-list/pvp-list.component';
import { LanguagePipe } from './pipes/language.pipe';
import { LevelComponent } from './components/classes/level/level.component';
import { ToHtmlPipe } from './pipes/to-html.pipe';
import { PvpTalentComponent } from './components/classes/pvp-talent/pvp-talent.component';
import { LanguageComponent } from './components/language/language.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ChoosePageComponent,
    ClassesComponent,
    ProfessionsComponent,
    ClassTreeComponent,
    ClassTalentComponent,
    ImagePipePipe,
    TooltipDirective,
    TooltipComponent,
    ClassListComponent,
    CapitalizePipe,
    ProfessionListComponent,
    ClassConnectorComponent,
    ProfessionTabComponent,
    ProfessionTalentComponent,
    ProfessionConnectorComponent,
    PvpListComponent,
    LanguagePipe,
    LevelComponent,
    ToHtmlPipe,
    PvpTalentComponent,
    LanguageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [ImagePipePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
