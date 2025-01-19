import React from 'react';
import { Typography, Card } from 'antd';

const { Title, Paragraph } = Typography;

const UserManagment = () => {
    return (
        <Card style={{ maxWidth: 800, margin: '20px auto', padding: 20 }}>
            <Title level={3}>Instrucciones para el Módulo de Gestión de Usuarios</Title>
            <Paragraph>
                <strong>Objetivo:</strong> Crear un módulo que permita la gestion de usuarios y editar únicamente sus datos personales, correo y contraseña. A continuación, se describen los requisitos:
            </Paragraph>
            <ol>
            <li>
                    <strong>Listado de usuarios:</strong>
                    <ul>
                        <li>El módulo debe incluir una tabla o lista que muestre todos los usuarios existentes en la base de datos.</li>
                        <li>Utilizar la función <code>getUsers</code> ubicada en <code>src/services/getUsers</code> para obtener la lista de usuarios.</li>
                        <li>Mostrar en la lista al menos los siguientes datos de cada usuario:
                            <ul>
                                <li>Nombre completo.</li>
                                <li>Correo electrónico.</li>
                                <li>Rol de usuario.</li>
                                <li>Fecha de creación.</li>
                            </ul>
                        </li>
                        <li>La lista debe ser paginada si hay muchos usuarios.</li>
                    </ul>
                </li>
                <li>
                    <strong>Formulario de edición:</strong>
                    <ul>
                        <li>Debe contener los siguientes campos:
                            <ul>
                                <li>Nombre completo (campo de texto).</li>
                                <li>Correo electrónico (campo de texto con validación de formato).</li>
                                <li>Contraseña (campo de texto oculto con validación).</li>
                            </ul>
                        </li>
                        <li>El formulario debe mostrar los datos actuales del usuario.</li>
                        <li>Validaciones requeridas:
                            <ul>
                                <li>El nombre no puede estar vacío.</li>
                                <li>El correo debe tener un formato válido.</li>
                                <li>La contraseña debe tener al menos 8 caracteres.</li>
                            </ul>
                        </li>
                    </ul>
                </li>
                <li>
                    <strong>Restricciones:</strong>
                    <ul>
                        <li>El formulario debe permitir editar únicamente los datos del usuario autenticado.</li>
                    </ul>
                </li>
                <li>
                    <strong>Interacción con el backend:</strong>
                    <ul>
                        <li>Los datos deben enviarse al servidor mediante una solicitud POST o PUT.</li>
                        <li>Mostrar mensajes de éxito o error según la respuesta del servidor.</li>
                    </ul>
                </li>
                <li>
                    <strong>Estilo y presentación:</strong>
                    <ul>
                        <li>El formulario debe ser claro, fácil de usar y estar bien estructurado.</li>
                        <li>Usar estilos consistentes con el diseño general de la aplicación.</li>
                    </ul>
                </li>
            </ol>
            <Paragraph>
                <strong>Ejemplo de datos del usuario:</strong>
            </Paragraph>
            <ul>
                <li><strong>Nombre:</strong> Javier Valenzuela</li>
                <li><strong>Correo:</strong> javier.valenzuela@gmail.com</li>
                <li><strong>Contraseña:</strong> ******** (oculta)</li>
            </ul>
        </Card>
    );
};

export default UserManagment;
