import { useState, useEffect } from "react";
import {
  IonApp,
  IonRouterOutlet,
  setupIonicReact,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonItem,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonLabel,
  IonList,
} from "@ionic/react";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";

setupIonicReact();

interface ID {
  name: string;
  value: string;
}

const App: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);
  useEffect(() => {
    const fetchUsers = async () => {
      fetch("https://randomuser.me/api/?results=100")
        .then((response) => response.json())
        .then((data) => setUsers(data?.results))
        .catch((error) => console.error(error));
    };

    fetchUsers();
  }, []);

  const removeUser = (id: ID) => {
    const newUsers = users.filter((user) => user.id.value !== id.value);
    setUsers(newUsers);
  };

  return (
    <IonApp>
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Users</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen>
          <IonHeader collapse="condense">
            <IonToolbar>
              <IonTitle size="large">Blank</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonList>
            {users.map((user, i) => (
              <IonItemSliding key={i}>
                <IonItemOptions
                  side="start"
                  onIonSwipe={() => removeUser(user.id)}
                ></IonItemOptions>

                <IonItem>
                  <IonLabel>{`${user.name.title} ${user.name.first} ${user.name.last}`}</IonLabel>
                </IonItem>
              </IonItemSliding>
            ))}
          </IonList>
        </IonContent>
      </IonPage>
    </IonApp>
  );
};

export default App;
