using PdfSharp.Pdf;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PdfGameFramework
{
    class Program
    {
        static void Main(string[] args)
        {
            using (PdfDocument pdf = new PdfDocument())
            {
                PdfPage page1 = pdf.AddPage();

                var canvasTop = 800;
                var canvasLeft = 50;

                var screenMatrixWidth = 80f;
                var screenMatrixHeight = 60f;

                var canvasWidth = 400f;
                var canvasHeight = 400f;

                var cellWidth = canvasWidth / screenMatrixWidth;
                var cellHeight = canvasHeight / screenMatrixHeight;

                var fields = new List<PdfDictionary>();

                for (var column = 0; column < screenMatrixWidth; column++)
                {
                    for (var row = 0; row < screenMatrixHeight; row++)
                    {
                        var x = canvasLeft + column * cellWidth;
                        var y = canvasTop - row * cellWidth;
                        var field = AddField($"mtx_{column}_{row}_1", x, y, cellWidth, cellHeight, 0f, 66f, 0f, pdf);
                        fields.Add(field);
                    }
                }

                for (var column = 0; column < screenMatrixWidth; column++)
                {
                    for (var row = 0; row < screenMatrixHeight; row++)
                    {
                        var x = canvasLeft + column * cellWidth;
                        var y = canvasTop - row * cellWidth;
                        var field = AddField($"mtx_{column}_{row}_0", x, y, cellWidth, cellHeight, 0.1f, 0.1f, 0.1f, pdf);
                        fields.Add(field);
                    }
                }

                var controlWidth = 100;
                var controlHeight = 25;

                var controlsAreaTop = canvasTop - canvasHeight - controlHeight;

                var controlLeftField = AddField(
                    "btnControlLeft",
                    canvasLeft,
                    controlsAreaTop - controlHeight,
                    controlWidth,
                    controlHeight,
                    0.1f, 0.2f, 0.3f, pdf);

                var controlTopField = AddField(
                    "btnControlTop",
                    canvasLeft + controlWidth,
                    controlsAreaTop,
                    controlWidth,
                    controlHeight,
                    0.1f, 0.2f, 0.3f, pdf);

                var controlBottomField = AddField(
                    "btnControlBoottom",
                    canvasLeft + controlWidth,
                    controlsAreaTop - controlHeight,
                    controlWidth,
                    controlHeight,
                    0.1f, 0.2f, 0.3f, pdf);

                var controlRightField = AddField(
                    "btnControlRight",
                    canvasLeft + 2 * controlWidth,
                    controlsAreaTop - controlHeight,
                    controlWidth,
                    controlHeight,
                    0.1f, 0.2f, 0.3f, pdf);

                AddJsHandler("/D", "leftClicked()", controlLeftField);
                AddJsHandler("/D", "bottomClicked()", controlBottomField);
                AddJsHandler("/D", "topClicked()", controlTopField);
                AddJsHandler("/D", "rightClicked()", controlRightField);

                PdfArray annotsArray = new PdfArray(pdf);
                fields.ForEach(annotsArray.Elements.Add);
                annotsArray.Elements.Add(controlLeftField);
                annotsArray.Elements.Add(controlRightField);
                annotsArray.Elements.Add(controlBottomField);
                annotsArray.Elements.Add(controlTopField);
                pdf.Internals.AddObject(annotsArray);

                page1.Elements.Add("/Annots", annotsArray);

                var js = new PdfDictionary(pdf);
                js.Elements["/S"] = new PdfName("/JavaScript");
                js.Elements["/JS"] = new PdfString(File.ReadAllText("Main.js"));

                pdf.Internals.AddObject(js);
                pdf.Internals.Catalog.Elements["/OpenAction"] = PdfSharp.Pdf.Advanced.PdfInternals.GetReference(js);

                const string filename = @"Output.pdf";
                pdf.Save(filename);
                pdf.Close();

                Process.Start(filename);
            }
        }

        private static void AddJsHandler(string eventName, string js, PdfDictionary fieldDeclaration)
        {
            var handler = new PdfDictionary();
            handler.Elements.Add("/S", new PdfName("/JavaScript"));
            handler.Elements.Add("/JS", new PdfString(js));

            var jsAction = new PdfDictionary();
            jsAction.Elements.Add(eventName, handler);
            fieldDeclaration.Elements.Add("/AA", jsAction);
        }

        private static PdfDictionary AddField(string name, float x, float y, float width, float height, float r, float g, float b, PdfDocument pdf)
        {
            var left = x;
            var right = x + width;
            var bottom = y + height;
            var top = y;

            PdfArray rect = new PdfArray(pdf);
            rect.Elements.Add(new PdfReal(left));
            rect.Elements.Add(new PdfReal(bottom));
            rect.Elements.Add(new PdfReal(right));
            rect.Elements.Add(new PdfReal(top));
            pdf.Internals.AddObject(rect);

            PdfDictionary form = new PdfDictionary(pdf);
            form.Elements.Add("/Subtype", new PdfName("/Form"));
            form.Elements.Add("/Type", new PdfName("/XObject"));
            form.Elements.Add("/FormType", new PdfInteger(1));
            form.Elements.Add("/BBox", new PdfArray(pdf, new PdfInteger(0), new PdfInteger(0), new PdfInteger(150), new PdfInteger(25)));
            form.CreateStream(Encoding.UTF8.GetBytes($@"
{r} {g} {b} rg
0.0 0.0 150 25 re f
"));


            PdfDictionary appearanceStream = new PdfDictionary(pdf);
            appearanceStream.Elements.Add("/N", form);
            pdf.Internals.AddObject(appearanceStream);

            var mk = new PdfDictionary(pdf);
            mk.Elements.Add("/BG", new PdfArray(pdf, new PdfReal(r), new PdfReal(g), new PdfReal(b)));

            PdfDictionary textfield = new PdfDictionary(pdf);
            textfield.Elements.Add("/FT", new PdfName("/Tx"));
            textfield.Elements.Add("/Subtype", new PdfName("/Widget"));
            textfield.Elements.Add("/T", new PdfString(name));
            textfield.Elements.Add("/V", new PdfString(""));
            textfield.Elements.Add("/Type", new PdfName("/Annot"));
            textfield.Elements.Add("/AP", appearanceStream);
            textfield.Elements.Add("/Rect", rect);
            textfield.Elements.Add("/MK", mk);
            textfield.Elements.Add("/Ff", new PdfInteger(2));
            return textfield;
        }
    }
}
