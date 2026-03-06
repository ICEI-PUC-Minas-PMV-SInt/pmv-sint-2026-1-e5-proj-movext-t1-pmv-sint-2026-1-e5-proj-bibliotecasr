# Especificações do Projeto

<span style="color:red">Pré-requisitos: <a href="1-Documentação de Contexto.md"> Documentação de Contexto</a></span>

Definição do problema e ideia de solução a partir da perspectiva do usuário. É composta pela definição do  diagrama de personas, histórias de usuários, requisitos funcionais e não funcionais além das restrições do projeto.

Apresente uma visão geral do que será abordado nesta parte do documento, enumerando as técnicas e/ou ferramentas utilizadas para realizar a especificações do projeto

## Arquitetura e Tecnologias

O projeto será desenvolvido utilizando a arquitetura no modelo cliente-servidor, organizada em camadas, com separação entre frontend, backend e banco de dados.

As tecnologias que serão utilizadas no desenvolvimento da aplicação são:

* Frontend – React Native
* Backend – ASP.NET Core
* Banco de dados – MySQL

![Diagrama](img/diagrama.jpg) 


## Project Model Canvas

![Project_Model_Canvas](img/pmc.jpg)


## Requisitos

As tabelas que se seguem apresentam os requisitos funcionais e não funcionais que detalham o escopo do projeto. Para determinar a prioridade de requisitos, aplicar uma técnica de priorização de requisitos e detalhar como a técnica foi aplicada.

### Requisitos Funcionais

|ID    | Descrição do Requisito  | Prioridade |
|------|-----------------------------------------|----|
|RF-001| O sistema deve permitir que o usuário faça login | ALTA | 
|RF-002| O sistema deve permitir que o usuário pesquise por um item | ALTA |
|RF-003| O sistema deve permitir que o usuário solicite a reserva de um item | ALTA | 
|RF-004| O sistema deve notificar o usuário quando a data de devolução estiver próxima | ALTA |
|RF-005| O sistema deve notificar o usuário quando a reserva estiver disponível para retirada | ALTA | 
|RF-006| O sistema deve permitir que o usuário consulte a agenda de clubes da biblioteca | ALTA |
|RF-007| O sistema deve notificar o usuário quando a seu empréstimo estiver atrasado | ALTA | 
|RF-008| O sistema deve permitir que o usuário consulte o status do seu cadastro | ALTA |
|RF-009| O sistema deve permitir que o usuário visualize seu histórico de emprétimos | ALTA |

### Requisitos não Funcionais

|ID     | Descrição do Requisito  |Prioridade |
|-------|-------------------------|----|
|RNF-001| O sistema deve ser responsivo para rodar em um dispositivos móvel | MÉDIA | 
|RNF-002| Deve processar requisições do usuário em no máximo 3s |  BAIXA | 
|RNF-003| A interface deve ser simples e intuitiva |  MÉDIA | 
|RNF-004| O sistema deverá ser compatívem com sistemas operacionais Android e IOS |  MÉDIA | 

## Restrições

O projeto está restrito pelos itens apresentados na tabela a seguir.

|ID| Restrição                                             |
|--|-------------------------------------------------------|
|01| O projeto deverá ser entregue até o final do semestre |
|02| 	A equipe não pode subcontratar o desenvolvimento do trabalho.        |

## Diagrama de Casos de Uso

O diagrama de casos de uso é o próximo passo após a elicitação de requisitos, que utiliza um modelo gráfico e uma tabela com as descrições sucintas dos casos de uso e dos atores. Ele contempla a fronteira do sistema e o detalhamento dos requisitos funcionais com a indicação dos atores, casos de uso e seus relacionamentos. 

As referências abaixo irão auxiliá-lo na geração do artefato “Diagrama de Casos de Uso”.

> **Links Úteis**:
> - [Criando Casos de Uso](https://www.ibm.com/docs/pt-br/elm/6.0?topic=requirements-creating-use-cases)
> - [Como Criar Diagrama de Caso de Uso: Tutorial Passo a Passo](https://gitmind.com/pt/fazer-diagrama-de-caso-uso.html/)
> - [Lucidchart](https://www.lucidchart.com/)
> - [Astah](https://astah.net/)
> - [Diagrams](https://app.diagrams.net/)

## Modelo ER (Projeto Conceitual)

O Modelo ER representa através de um diagrama como as entidades (coisas, objetos) se relacionam entre si na aplicação interativa.

Sugestão de ferramentas para geração deste artefato: LucidChart e Draw.io.

A referência abaixo irá auxiliá-lo na geração do artefato “Modelo ER”.

> - [Como fazer um diagrama entidade relacionamento | Lucidchart](https://www.lucidchart.com/pages/pt/como-fazer-um-diagrama-entidade-relacionamento)

## Projeto da Base de Dados

O projeto da base de dados corresponde à representação das entidades e relacionamentos identificadas no Modelo ER, no formato de tabelas, com colunas e chaves primárias/estrangeiras necessárias para representar corretamente as restrições de integridade.
