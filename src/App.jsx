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
} from "reactstrap";
import { useEffect, useState } from "react";
function App() {
  const datos = [
    { id: 1, nombre: "emily", apellido: "willis" },
    { id: 2, nombre: "channel", apellido: "preston" },
    { id: 3, nombre: "asa", apellido: "akira" },
  ];
  
  const [data, setData] = useState([]);
  const [mostrarmodal, setMostrarmodal] = useState(false);
  const [mostrarmodaleditar, setMostrarmodaleditar] = useState(false);
  const [campos, setCampos] = useState({ id: "", nombre: "", apellido: "" });
  const [registro, setRegistro] = useState({});

  useEffect(() => {
    setData(datos);
  
  }, []);

  
  
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
        return { ...dat, nombre: campos.nombre, apellido: campos.apellido };
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
      <Container></Container>
      <br></br>
      <Button color="primary" onClick={(e) => modalabrir()}>
        insertar nuevo
      </Button>

      <Table>
        <thead>
          <tr>
            <th>a</th>
            <th>b</th>
            <th>c</th>
            <th>d</th>
          </tr>
        </thead>
        <tbody>
          {data.map((datas) => {
            return (
              <tr key={datas.id}>
                <td>{datas.id}</td>
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
            <label>apellido:</label>
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
            <label>apellido:</label>
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
