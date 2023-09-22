import "bootstrap/dist/css/bootstrap.min.css";
import {
  Table,
  Button,
  Container,
  Modal,
  ModalBody,
  ModalHeader,
  FormGroup,
  ModalFooter,
  CardHeader
} from "reactstrap";
import { useEffect, useState } from "react";
import  "./app.css";
function App() {
  const datos = [
    { id: 1, nombre: "rose", apellido: "Roseanne Park, más conocida por su nombre artístico Rosé, es una cantante, modelo y bailarina neozelandesa de origen surcoreano, miembro del grupo femenino Blackpink formado por la discográfica YG Entertainment en 2016.​ Su debut como solista fue el 12 de marzo de 2021, con el sencillo «On the Ground»", source:"8176495cd18e8e8e6e590aef31c0a079.jpg" },
    { id: 2, nombre: "jisoo", apellido: "Kim Ji-soo, más conocida como Jisoo, es una cantante, actriz, modelo, bailarina y presentadora de televisión surcoreana, miembro del grupo Blackpink. Se unió a YG Entertainment en 2011 y se convirtió en aprendiz durante cinco años antes de debutar con Blackpink en agosto de 2016", source:"a07c1d67f18a0d9441f678282b6545ac.jpg" },
    { id: 3, nombre: "lisa", apellido: "Lalisa Manobal​​, ​ más conocida por su nombre artístico Lisa, es una rapera, modelo, cantante y bailarina tailandesa. Es integrante del grupo femenino Blackpink, formado en 2016 por YG Entertainment.​Lisa hizo su debut en solitario con su álbum sencillo Lalisa en septiembre de 2021", source:"953b11cb8520435fc50a1d96dde9c250.jpg" },
    
    { id: 5, nombre: "jihyo", apellido: "Park Ji-hyo, más conocida como Jihyo, es una cantautora, modelo y bailarina surcoreana. En 2015, participó en el programa Sixteen, donde compitió para formar parte de Twice.​ Debutó como integrante y líder del grupo en el mismo año, bajo JYP Entertainment", source:"3a4e7663255112d8bf273432cd3645aa.jpg" },
  ];
 
  const [data, setData] = useState([]);
  const [mostrarmodal, setMostrarmodal] = useState(false);
  const [mostrarmodaleditar, setMostrarmodaleditar] = useState(false);
  const [campos, setCampos] = useState({ id: "", nombre: "", apellido: "",source:"" });
  const [registro, setRegistro] = useState({});
  // const [imagenn, setImagenn] = useState([])

  useEffect(() => {
    setData(datos);
  
  }, []);

  // const imagen = (e) => {
  //   console.log(e.target.value)
    
  // };
  
  const editarcampos0 = (e) => {
  const reader= new FileReader()
  reader.readAsDataURL(e.target.files[0])
  reader.addEventListener("load",direct=>{
    console.log(direct.currentTarget.result)
    setCampos({ ...campos, source:direct.currentTarget.result});
    // console.log(campos);
  })
    
    
  };

  const editarcampos = (e) => {
    setCampos({ ...campos, nombre: e.target.value, id: data.length + 1 });
    console.log(campos);
    
  };

  const editarcampos1 = (e) => {
    setCampos({ ...campos, apellido: e.target.value, id: data.length + 1 });
    console.log(campos);
    
  };

  const modalabrir = () => {
    setMostrarmodal(true);
  };

  const modalcerrar = () => {
    setMostrarmodal(false);
  };

  const modaleditarabrir = (datasss) => {
    setRegistro(datasss);
    setCampos(datasss)
    setMostrarmodaleditar(true);
    
  };

  const modaleditarcerrar = () => {
    setMostrarmodaleditar(false);
  };

  const insertar = () => {
    
    console.log(campos);

//modificacion
    

    setData([...data, campos]);
    console.log(data);
    setMostrarmodal(false);
  };

  
  const insertareditar = () => {
    console.log(registro);

    setCampos({ ...campos, id: registro.id });

    const newdato = data.map((dat) => {
      if (dat.id === registro.id) {
        console.log("hay una coincidencia");
        console.log(campos);
        return { ...dat, nombre: campos.nombre, apellido: campos.apellido, source:campos.source };
      }

      return dat;
    });

    setData(newdato);

    setMostrarmodaleditar(false);
  };

  const eliminar = (dattas) => {

    console.log(dattas);
    const hola=data.filter((dat) => dat.id !== dattas.id)
    setData(hola);
    console.log(hola);

   const nueva= hola.map((res,ind)=>{
      return {...res,id:ind+1}
    })
   setData(nueva)
  };

  
  return (
    <>
      {/* <div className="hola">Crud about girls Kpop</div> */}
      <CardHeader></CardHeader>
      <Container></Container>
      <br></br>
      <Button color="primary" onClick={(e) => modalabrir()}>
        insertar nuevo
      </Button>

      <Table>
        <thead>
          <tr>
            <th>id</th>
            <th>imagen</th>
            <th>nombre</th>
            <th>descripcion</th>
            <th>funciones</th>
          </tr>
        </thead>
        <tbody>
          {data.map((datas) => {
            return (
              <tr key={datas.id}>
                <td>{datas.id}</td>
                <td><img src={datas.source}/></td>
                <td>{datas.nombre}</td>
                <td>{datas.apellido}</td>
                
                <td>
                  <Button
                    onClick={(e) => modaleditarabrir(datas)}
                    color="primary"
                  >
                    editar
                  </Button>{" "}
                  <Button onClick={(e) => eliminar(datas)} color="danger">
                    eliminar
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>

      <Modal isOpen={mostrarmodal}>
        <ModalHeader></ModalHeader>
        <ModalBody>
        <FormGroup>
            <label>imagen:</label>
            <input
              type="file"
              className="form-control"
              name="apellido"
              onChange={editarcampos0}
              
            />
          </FormGroup>
          {/* <img src={campos.source}  /> */}
          <FormGroup>
            <label>id:</label>
            <input
              type="text"
              className="form-control"
              readOnly
              value={data.length + 1}
            />
          </FormGroup>
          <FormGroup>
            <label>nombre:</label>
            <input
              type="text"
              className="form-control"
              name="nombre"
              onChange={editarcampos}
            />
          </FormGroup>
          <FormGroup>
            <label>descripcion:</label>
            <input
              type="text"
              className="form-control"
              name="apellido"
              onChange={editarcampos1}
            />
          </FormGroup>
          
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={(e) => insertar()}>
            insertar
          </Button>
          <Button onClick={(e) => modalcerrar()} color="danger">
            cancelar
          </Button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={mostrarmodaleditar}>
        <ModalHeader></ModalHeader>
        <ModalBody>
        <FormGroup>
            <label>imagen:</label>
            <input
              type="file"
              className="form-control"
              name="apellido"
              onChange={editarcampos0}
              
            />

          <img src={campos.source}  />
          </FormGroup>

          <FormGroup>
            <label>id:</label>
            <input
              type="text"
              className="form-control"
              readOnly
              value={registro.id}
            />
          </FormGroup>
          <FormGroup>
            <label>nombre:</label>
            <input
              type="text"
              className="form-control"
              name="nombre"
              onChange={(e) => editarcampos(e)}
              value={campos.nombre}
            />
          </FormGroup>
          <FormGroup>
            <label>descripciion:</label>
            <input
              type="text"
              className="form-control"
              name="apellido"
              onChange={(e) => editarcampos1(e)}
              value={campos.apellido}
            />
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={(e) => insertareditar()}>
            insertar
          </Button>
          <Button onClick={(e) => modaleditarcerrar()} color="danger">
            cancelar
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

export default App;
