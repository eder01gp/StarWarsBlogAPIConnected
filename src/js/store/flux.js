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
			getLocalVehicles: async () => {
				const vehiclesLocal = JSON.parse(localStorage.getItem("vehicles"));
				if (vehiclesLocal) {
				  setStore({ vehicles: vehiclesLocal });
				} else {
				  getActions().getVehicles();
				}
			  },
			  getVehicles: async () => {
				const store = getStore();
				const nextLocal = JSON.parse(localStorage.getItem("next"));
				if (nextLocal) {
					setStore({ next: nextLocal });
				  }
		
				  const response = await fetch(store.next);
				  const vehiclesAPI = await response.json();
		
				  for (let j = 0; j < vehiclesAPI.results.length; j++) {
					const response = await fetch(
					  "https://www.swapi.tech/api/vehicles/" +
						vehiclesAPI.results[j].uid
					);
					const vehicleAPI = await response.json();
					let findID = store.vehicles.find(
					  (e) => e.uid == vehicleAPI.result.uid
					);
					if (findID) {
					} else {
					  setStore({ vehicles: [...store.vehicles, vehicleAPI.result] });
					  localStorage.setItem("vehicles", JSON.stringify(store.vehicles));
					}
				  }
				  setStore({ next: vehiclesAPI.next });
				  localStorage.setItem("next", JSON.stringify(vehiclesAPI.next));
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
