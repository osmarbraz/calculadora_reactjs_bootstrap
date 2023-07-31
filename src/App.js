import { useState } from 'react';
import './App.css';
import { Form, Button } from 'react-bootstrap';

function FrmCalculadora() {
 
    // Estados inciais das variáveis do formulário
    const [valorA, setValorA] = useState(0);
    const [operacao, setOperacao] = useState('adicao');
    const [valorB, setValorB] = useState(0);
    const [resultado, setResultado] = useState(0);
  
    // Submissão do formulário.
    const handleSubmit = (event) => {
      // Impede o recarregamento da página
      event.preventDefault();      
      //Endereço da API + operação + valorA + valorB
      fetch(`http://localhost:8000/${operacao}/${valorA}/${valorB}`)
        .then((res) => res.json()) //Converte a resposta para JSON
        .then((data) => setResultado(data.resultado)); // Atribui a resposta ao resultado
    }

    // Limpa os campos do formulário.     
    const limpar = () => { 
      setValorA(0);
      setOperacao('adicao');
      setValorB(0);
      setResultado(0);
    }
  
    // Renderiza o formulário
    return (      
      <Form name="FrmCalculadora" method="get" onSubmit={handleSubmit}>
        <Form.Label><h1>Formulário Calculadora</h1> </Form.Label><br/>
        <Form.Group>
          <Form.Label>Valor A: 
          <Form.Control type="number" name="valorA" value={valorA} onChange={(event) => setValorA(event.target.value)}/>
          </Form.Label><br/>
        </Form.Group>     
        <Form.Group>
          <Form.Label>Opera&ccedil;&atilde;o:</Form.Label>
          <Form.Select name="operacao" value={operacao} onChange={(event) => setOperacao(event.target.value)} >
                      <option value="adicao">Adi&ccedil;&atilde;o</option>
                      <option value="subtracao">Subtra&ccedil;&atilde;o</option>
                      <option value="multiplicacao">Multiplica&ccedil;&atilde;o</option>
                      <option value="divisao">Divis&atilde;o</option>
          </Form.Select><br/>
        </Form.Group>
        <Form.Group>
          <Form.Label>Valor B: 
          <Form.Control type="number" id="valorB" name="valorB" value={valorB} onChange={(event) => setValorB(event.target.value)} /></Form.Label><br/>
        </Form.Group>
        <Form.Group>
          <Button variant="secondary" name="Limpar" onClick={limpar}>Limpar</Button>
          <Button variant="primary" type="submit" name="Calcular">Calcular</Button>
        </Form.Group>
        <Form.Group>
          <br/><Form.Label>Resultado: {resultado} </Form.Label>     
        </Form.Group>
    </Form>
    )
  }
  
  export default FrmCalculadora;