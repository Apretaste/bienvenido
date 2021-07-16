<template>
	<div class="text-center">
		<!-- image -->
		<ap-image class="mt-5" :data="image"></ap-image>

		<!-- title and text-->
		<p class="h1 first-tx mt-4 mb-3">{{ title }}</p>
		<p class="second-tx">{{ desc }}</p>

		<!-- button -->
		<ap-button v-show="this.screen > 0" :data="btnBack"></ap-button>
		<ap-button :data="btnNext"></ap-button>
	</div>
</template>

<script>
	module.exports = {
		mounted: function () {
			this.screen = 0;

			this.info = [{
				title:'Hola, soy Apretín',
				desc:'Soy la mascota de Apretaste. Estoy acá para guiarte empezando a usar la app, y ayduarte en lo que necesites',
			},{
				title:'Date a conocer',
				desc:'Apretaste es una app social. Empieza por llenar tu perfil y ponerte una foto que te represente, para que todo el mundo te conozca.',
			},{
				title:'Crece tu red',
				desc:'Ahora necesitarás amigos. Envía solicitudes y crece tu círculo. Te recomiendo seguir a los influencers que te gusten.',
			},{
				title:'¡Sé tú mismo!',
				desc:'Habla sin pelos en la lengua con miles de cubanos, y comparte lo que piensas de manera segura, y sin que nadie te bloquee.',
			},{
				title:'Hazte popular y gana',
				desc:'Gana experiencia usando la app, sube de nivel y llega al tope del ranking. Gana créditos y participa en la Rifa diaria.',
			},{
				title:'¡Ponte al día!',
				desc:'Consulta las noticias de la prensa más leída de Cuba. Comparte y comenta, para que otros sepan como piensas.',
			},{
				title:'Encuéntralo todo',
				desc:'Busca a tu media naranja, mira que se compra y se vende, revisa la Bolita, y disfruta decenas de servicios entretenidos y útiles.',
			},{
				title:'¿Necesitas ayuda?',
				desc:'Y si tienes dudas, pregúntame desde el servicio "Ayuda" y te responderé cualquier duda que tengas en menos de 72 horas.',
			}];

			this.update(0);
		},
		data: function () {
			return {
				image: {
					src: '',
					size: {width: 300, height: 300}
				},
				title: '',
				desc: '',
				btnBack: {
					caption: 'Atrás', 
					onTap: this.back
				},
				btnNext: {
					icon: 'fas fa-arrow-right',
					caption: '',
					isPrimary: true 
				}
			};
		},
		methods: {
			next() {
				this.update(this.screen++);
			},
			back() {
				this.update(this.screen--);
			},
			update() {
				if(this.screen <= 0) {
					this.btnNext.caption = 'Comenzar';
					this.btnNext.onTap = this.next;
				} else if(this.screen >= 7) {
					this.btnNext.caption = '¡Vamos!';
					this.btnNext.onTap = function(){ apretaste.send({command:'PIZARRA'}) };
				} else {
					this.btnNext.caption = 'Siguiente';
					this.btnNext.onTap = this.next;
				}

				this.title = this.info[this.screen].title;
				this.desc = this.info[this.screen].desc;
				this.image.src = apretaste.servicePath + '/images/'+this.screen+'.jpg';
			}
		}
	}
</script>

<style scoped>
</style>
