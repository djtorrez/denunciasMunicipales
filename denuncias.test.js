import chai from 'chai';
import chaiHttp from 'chai-http';
import server from './server';

chai.use(chaiHttp);

describe('Denuncias Municipales', () => {
    it('Devuelve una lista de denuncias', (done) => {
        chai.request(server)
            .get('/denuncias')
            .end((err, res) => {
                chai.expect(res).to.have.status(200);
                chai.expect(res.body).to.be.an('array');
                done();
            });
    });

    it('Devuelve una denuncia específica', (done) => {
        chai.request(server)
            .get('/denuncias/1')
            .end((err, res) => {
                chai.expect(res).to.have.status(200);
                chai.expect(res.body).to.have.property('id');
                chai.expect(res.body).to.have.property('titulo');
                chai.expect(res.body).to.have.property('descripcion');
                done();
            });
    });

    it('Crea una nueva denuncia', (done) => {
        const body = {
            titulo: 'Denuncia de prueba',
            descripcion: 'Esta es una denuncia de prueba.',
        };

        chai.request(server)
            .post('/denuncias')
            .send(body)
            .end((err, res) => {
                chai.expect(res).to.have.status(201);
                chai.expect(res.body).to.have.property('id');
                chai.expect(res.body).to.have.property('titulo');
                chai.expect(res.body).to.have.property('descripcion');
                done();
            });
    });

    it('Actualiza una denuncia existente', (done) => {
        const body = {
            titulo: 'Denuncia actualizada',
            descripcion: 'Esta es una denuncia actualizada.',
        };

        chai.request(server)
            .patch('/denuncias/1')
            .send(body)
            .end((err, res) => {
                chai.expect(res).to.have.status(200);
                chai.expect(res.body).to.have.property('id');
                chai.expect(res.body).to.have.property('titulo');
                chai.expect(res.body).to.have.property('descripcion');
                done();
            });
    });

    it('Elimina una denuncia existente', (done) => {
        chai.request(server)
            .delete('/denuncias/1')
            .end((err, res) => {
                chai.expect(res).to.have.status(204);
                done();
            });
    });
});