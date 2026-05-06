import { Component, OnInit, DoCheck, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Profile } from 'src/app/models/profile';
import { User } from 'src/app/models/user';
import { ProfileService } from 'src/app/services/profile.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-cintamiembro',
  templateUrl: './cintamiembro.component.html',
  styleUrls: ['./cintamiembro.component.css'],
  standalone: false
})
export class CintamiembroComponent implements OnInit {
  @Input() articulosVistos: number = 0;
  @Input() limiteAlcanzado: boolean = false;

  public user!: User;
  public userServer: User;
  error: string;
  uid!: string;
  role: string;
  roleid!: number;
  public identity: User;
  profile:Profile;

  constructor(
    private userService: UserService,
    private router: Router,
    private profileService: ProfileService,

  ) {
    this.user = userService.usuario;
  }
  ngOnInit(): void {
  const userStorage = localStorage.getItem('user');

  if (userStorage && userStorage !== 'undefined') {
    this.user = JSON.parse(userStorage);
    
    // Verificamos que el objeto parseado no sea null
    if (this.user) {
      this.role = this.user.role;
      this.uid = this.user.uid;
      this.getProfileData();
    }
  } else {
    // Si no hay usuario, el rol es null y no buscamos perfil
    this.role = null;
    this.user = null;
  }
}

  

  getProfileData() {
  this.profileService.getByUser(this.uid).subscribe(
    res => {
      if (res) {
        this.profile = res;
        
        // Verificamos si es premium recorriendo el array de subcription que poblaste
        const tieneSub = res.subcription.some(s => s.status === 'ACTIVE');
        
        if (tieneSub) {
          this.role = 'MEMBER'; // Forzamos visualmente el rol premium
          this.limiteAlcanzado = false;
        } else {
          this.articulosVistos = res.articulosVistos || 0;
          this.limiteAlcanzado = this.articulosVistos >= 3;
        }
      }
    }
  );
}

  gotoSubscripcion() {
    this.router.navigateByUrl('/plan-subcripcion');
  }
  irAlLogin() {
    this.router.navigateByUrl('/login');
  }

}
