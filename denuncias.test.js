import chai from 'chai';
import chaiHttp from 'chai-http';
import server from './server';

chai.use(chaiHttp);

describe('Denuncias Municipales', () => {
    it('Devuelve una lista de denuncias', async () => {
        const response = await chai.request(server).get('/denuncias');

        chai.expect(response).to.have.status(200);
        chai.expect(response.body).to.be.an('array');
    });

    it('Devuelve una denuncia específica', async () => {
        const response = await chai.request(server).get('/denuncias/1');

        chai.expect(response).to.have.status(200);
        chai.expect(response.body).to.have.property('id');
        chai.expect(response.body).to.have.property('titulo');
        chai.expect(response.body).to.have.property('descripcion');
    });

    it('Crea una nueva denuncia', async () => {
        const body = {
            titulo: 'Denuncia de prueba',
            descripcion: 'Esta es una denuncia de prueba.',
        };

        const response = await chai.request(server).post('/denuncias').send(body);

        chai.expect(response).to.have.status(201);
        chai.expect(response.body).to.have.property('id');
        chai.expect(response.body).to.have.property('titulo');
        chai.expect(response.body).to.have.property('descripcion');
    });

    it('Actualiza una denuncia existente', async () => {
        const body = {
            titulo: 'Denuncia actualizada',
            descripcion: 'Esta es una denuncia actualizada.',
        };

        const response = await chai.request(server).patch('/denuncias/1').send(body);

        chai.expect(response).to.have.status(200);
        chai.expect(response.body).to.have.property('id');
        chai.expect(response.body).to.have.property('titulo');
        chai.expect(response.body).to.have.property('descripcion');
    });

    it('Elimina una denuncia existente', async () => {
        const response = await chai.request(server).delete('/denuncias/1');

        chai.expect(response).to.have.status(204);
    });
});