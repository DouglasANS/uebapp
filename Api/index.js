import axios from "axios";

/* const getHost=(host)=>{
    const hostname = window.location.hostname
    if(hostname.includes('http://localhost:3000/')){
        return 'http://localhost:8080/'
    } 
} */

const local = 'http://192.168.1.3:3002' //'http://localhost:3002'
const host = 'https://backendfunemg-backfune.alehbv.easypanel.host'

export const currentServer = host

export const ApiLoginUser = async (params) =>
    axios.post(`${currentServer}/api/login`, params)

export const getAllCursos = async (params) =>
    axios.get(`${currentServer}/api/cursos`, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem("token")}`
        }
    })

export const getInfoAlunoByCpf = async ({ cpf: cpf }) =>
    axios.get(`${currentServer}/api/getUserByCPF/${cpf}`)
export const getUserByCPFAndNascimento = async ({ cpf, dataNascimento }) => {
    console.log('1231 --',cpf, dataNascimento)
  return axios.post(`${currentServer}/api/getUserByCPFAndNascimento`, {
    cpf,
    data_nascimento: dataNascimento,
  },);
};


export const getInfoAlunoById = async ({ id: id }) =>
    axios.get(`${currentServer}/api/getUserById/${id}`)

export const verifyEmailExist = async ({ userEmail }) =>
    axios.post(`${currentServer}/api/verifyEmailExist`, { userEmail }, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem("token")}`
        }
    })

export const getImagemByUserId = async ({ id }) =>
    axios.get(`${currentServer}/api/imagem/${id}`)


export const desativarFuncionarioById = async ({ id: id }) =>
    axios.get(`${currentServer}/api/funcionarios/${id}/desativar`)

export const verifyCpfExist = async ({ cpf }) =>
    axios.post(`${currentServer}/api/verifyCpfExist`, { cpf }, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem("token")}`
        }
    })

export const getAllCursosEstudante = async ({ id }) =>
    axios.post(`${currentServer}/api/cursosMatriculados`, { id }, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem("token")}`
        }
    })

export const MatricularCurso = async ({ userId, cursoId }) =>
    axios.post(`${currentServer}/api/matricular`, { userId, cursoId },)

export const desmatricularCurso = async ({ userId, cursoId }) =>
    axios.post(`${currentServer}/api/desmatricular`, { userId, cursoId },)


export const concluirAula = async ({ aulaId, userId }) =>
    axios.post(`${currentServer}/api/concluirAula`, { userId, aulaId },)


export const CadastrarFuncionarioApi = async (params) =>
    axios.post(`${currentServer}/api/addFuncionario`, params,)

export const CadastrarUser = async (params) =>
    axios.post(`${currentServer}/api/addEstudante`, params,)

export const getAlunoByPageSize = async ({ size, page }) =>
    axios.post(`${currentServer}/api/getUserBySize`, { size, page },)


export const shortenLink = (link) => axios.get(`https://tinyurl.com/api-create.php?url=${link}`);

export const getFuncionarios = async ({ ativo, tipo }) =>
    axios.post(`${currentServer}/api/getFuncionarios`, { ativo, tipo })

export const getMetricas = async (params) =>
    axios.get(`${currentServer}/api/metricas`, params)


export const getInfoAluno = async ({ email: userEmail }) =>
    axios.get(`${currentServer}/api/getUserByEmail/${userEmail}`)

export const editUserById = async (params) =>
    axios.put(`${currentServer}/api/updateEstudante`, params, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem("token")}`
        }
    })


export const excluirUserByEmail = async ({ email }) =>
    axios.delete(`${currentServer}/api/deleteEstudante/${email}`)


// OLD CODE
export const LoginUser = async (params) =>
    axios.post(`${currentServer}/usuario/login`, params,)



export const CadastrarEstudante = async (params) =>
    axios.post(`${currentServer}/estudante/cadastro`, params,)


export const getInfoAluno1 = async ({ email }) =>
    axios.get(`${currentServer}/aluno/validacao/${email}`)






 






