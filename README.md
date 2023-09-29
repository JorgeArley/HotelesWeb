# Hoteles

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.3.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## memory to erase
1. $ sudo sysctl fs.inotify.max_user_watches=524288
2. $ sudo sysctl -p
## Dev
1. clonar el proyecto
2. ejecutar ```npm install```
3. ejecute ```ng serve``` el backend esta en la nube y no tendra que hacer nada mas

## criterios a tener en cuenta
1. Todos los usuarios se crean con el role 'user'
2. El rol admin lo tiene el correo: jorge@gmail.com y password: 123456
3. Puede crear un usuario para probar el role user
4. La aplicacion esta hecha en angular 16, express y mongo para DB
5. La ruta para la prueba es: 
    `https://quiet-manatee-3384ff.netlify.app/#/auth/login`
6. Los repositorios son los siguientes:
    * Frontend: `https://github.com/JorgeArley/HotelesWeb`
    * Backend: `https://github.com/JorgeArley/HotelesBackend`
7. Para probar el envio del correo debe ingresar un correo valido a la hora de registrarse