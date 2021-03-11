import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'gamerules',
    loadChildren: () => import('./pages/game-rules/game-rules.module').then((m) => m.GameRulesModule),
    pathMatch: 'full'
  },
  {
    path: 'playgame',
    loadChildren: () => import('./pages/play-game/play-game.module').then((m) => m.PlayGameModule),
    pathMatch: 'full'
  },
  {
    path: 'loadgame',
    loadChildren: () => import('./pages/load-game/load-game.module').then((m) => m.LoadGameModule),
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'gamerules'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
