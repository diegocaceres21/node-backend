import { readFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import PizZip from 'pizzip';
import Docxtemplater from 'docxtemplater';
import {format} from "date-fns";
import {es} from "date-fns/locale"

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export const obtenerCartaDeTraspasoFormatoWord = async (req, res) => {
    try {
        /*const user = await User.findById(req.params.userId);
        if (!user) {
            return res.status(404).send('User not found');
        }*/

        // Load the docx file as binary
        const fecha_hoy = new Date()
        const fechaFormateada = format(fecha_hoy, "dd 'de' MMMM 'de' yyyy", { locale: es });
        const templatePath = path.resolve(__dirname, '../plantillas', 'carta-traspaso.docx');
        const templateContent = readFileSync(templatePath, 'binary');

        const zip = new PizZip(templateContent);

        const doc = new Docxtemplater(zip, {
            paragraphLoop: true,
            linebreaks: true,
        });

        doc.setData({
            nombre_completo: req.body.nombre_completo,
            carnet: req.body.carnet,
            universidad: req.body.universidad,
            carrera: req.body.carrera,
            fecha: fechaFormateada
        });

        doc.render();

        const buf = doc.getZip().generate({ type: 'nodebuffer' });

        res.set({
            'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'Content-Disposition': 'attachment; filename=generatedDocument.docx',
        });

        res.send(buf);
    } catch (error) {
        console.error('Error generating document:', error);
        res.status(500).send('Internal Server Error');
    }
}
export const obtenerDocumentosEntregadosFormatoWord = async (req, res) => {
    try {

        // Load the docx file as binary
        const fecha_hoy = new Date()
        const fechaFormateada = format(fecha_hoy, "dd 'de' MMMM 'de' yyyy", { locale: es });
        const templatePath = path.resolve(__dirname, '../plantillas', 'documentos-entregados.docx');
        const templateContent = readFileSync(templatePath, 'binary');

        const zip = new PizZip(templateContent);

        const doc = new Docxtemplater(zip, {
            paragraphLoop: true,
            linebreaks: true,
        });

        doc.setData({
            nombre_completo: req.body.nombre_completo,
            carnet: req.body.carnet,
            admision: req.body.admision,
            carrera: req.body.carrera,
            fecha_titulo_legalizado_seduca: req.body.titulo_legalizado_seduca ? fechaFormateada : "",
            fecha_titulo_legalizado_gratis: req.body.titulo_legalizado_gratis ? fechaFormateada : "",
            fecha_titulo_simple: req.body.titulo_simple ? fechaFormateada : "",
            fecha_libreta: req.body.libreta ? fechaFormateada : "",
            fecha_carnet: req.body.carnet_identidad ? fechaFormateada : "",
            fecha_certificado: req.body.certificado ? fechaFormateada : "",
            fecha_fotos: req.body.fotos ? fechaFormateada : "",
        });

        doc.render();

        const buf = doc.getZip().generate({ type: 'nodebuffer' });

        res.set({
            'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'Content-Disposition': 'attachment; filename=generatedDocument.docx',
        });

        res.send(buf);
    } catch (error) {
        console.error('Error generating document:', error);
        res.status(500).send('Internal Server Error');
    }
}
/*export const obtenerCartaDeTraspasoFormatoPdf = async (req, res) => {
    try {
        // Receive parameters from the request
        const { username, email } = req.body;

        // Load the docx template
        const content = readFileSync(path.resolve(__dirname, '../plantillas', 'carta-traspaso.docx'), 'binary');

        // Create a docxtemplater instance
        const zip = new PizZip(content);
        const doc = new Docxtemplater(zip);

        // Replace placeholders in the docx template
        doc.setData({ username, email });
        doc.render();

        // Generate the modified DOCX
        const buf = doc.getZip().generate({ type: 'nodebuffer' });

        // Convert DOCX to HTML
        const result = await mammoth.convertToHtml({ buffer: buf });
        const html = result.value;

        // Convert HTML to PDF
        pdf.create(html).toBuffer((err, buffer) => {
            if (err) return res.status(500).send('Error generating PDF');

            // Set response headers and send the PDF
            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', 'attachment; filename=generated.pdf');
            res.send(buffer);
        });

    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred');
    }
};*/