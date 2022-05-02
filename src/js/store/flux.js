const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			vehicles: [],
			next: "https://www.swapi.tech/api/vehicles/",
			favourites: [],
			login: {User: "User", id:"40"},
			userData: {
				email: "",
				user: "",
				password: "",
			  }
		},
		actions: {
			setUserMail: (newData) =>{
				setStore({userData:{...getStore().userData, email:newData}});
			},
			setUserUser: (newData) =>{
				setStore({userData:{...getStore().userData, user:newData}});
			},
			setUserPassword: (newData) =>{
				setStore({userData:{...getStore().userData, password:newData}});
			},
			setLogin: (user) =>{
				setStore({login:user});
				getActions().getAllFavourites();
			},
			getVehicles: async() => {
				const store = getStore();
				const response = await fetch(store.next);
				const vehiclesAPI = await response.json();
				let vehiclesfullAPI = [];
				setStore({next:vehiclesAPI.next});
				
				for (let j=0; j<vehiclesAPI.results.length; j++){
					const  response = await fetch("https://www.swapi.tech/api/vehicles/"+vehiclesAPI.results[j].uid);
					const vehicleAPI = await response.json();
					setStore({vehicles:[...getStore().vehicles,vehicleAPI.result]});
				}
			//	setStore({vehicles:[...getStore().vehicles,vehiclesfullAPI]});
				console.log(getStore().vehicles);
			},
			updateFavourites: async (e) =>{
				const response = await fetch("https://3000-4geeksacade-flaskresthe-ykzyeg9yxkh.ws-eu43.gitpod.io/user/"+getStore().login.id+"/favorite/vehicle/"+e,
					{
					  method: "POST",
					  body: JSON.stringify("hola"),
					  headers: {
						  "access-control-allow-origin":	"*",
						  "Content-Type": "application/json"
					  }
					}
				  );
				  const confirmation = await response.json();
				  console.log(confirmation.Respuesta);
				
				getActions().getAllFavourites();
			},
			getAllFavourites: async () => {
				const response = await fetch("https://3000-4geeksacade-flaskresthe-ykzyeg9yxkh.ws-eu43.gitpod.io/user/"+getStore().login.id+"/favorites")
				const favorites = await response.json();
				console.log(favorites);
				setStore({favourites: favorites});
			}//ultimaAction
			}//actions
		}//return
	};//getState

export default getState;
