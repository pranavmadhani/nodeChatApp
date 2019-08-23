using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Windows.Forms;
using DevExpress.Skins;
using DevExpress.LookAndFeel;
using DevExpress.UserSkins;
using DevExpress.XtraBars;
using DevExpress.XtraBars.Ribbon;
using System;
using System.IO;
using System;
#pragma warning disable CS0105 // Using directive appeared previously in this namespace
using System.IO;
#pragma warning restore CS0105 // Using directive appeared previously in this namespace
using System.Collections.Generic;
using System.Threading;
using SautinSoft;
using SautinSoft;

namespace DXApplication1
{
    public partial class Form1 : DevExpress.XtraBars.Ribbon.RibbonForm
    {











        public Form1()
        {
            InitializeComponent();


        }

        private void barButtonItem1_ItemClick(object sender, ItemClickEventArgs e)
        {

            string pdfFile = pdfViewer.DocumentFilePath.ToString();
            string wordFile = Path.ChangeExtension(pdfFile, ".docx");


            //string pdfFile1 = 
            // Convert a PDF file to a Word file
            SautinSoft.PdfFocus f = new SautinSoft.PdfFocus();
            //this property is necessary only for registered version
            //f.Serial = "XXXXXXXXXXX";

            f.OpenPdf(pdfFile);

            if (f.PageCount > 0)
            {
                // You may choose output format between Docx and Rtf.
                f.WordOptions.Format = SautinSoft.PdfFocus.CWordOptions.eWordDocument.Docx;
                //f.WordOptions.Format = SautinSoft.PdfFocus.CWordOptions.eWordDocument.Rtf;

                int result = f.ToWord(wordFile);
                // int result_rtf = f.ToText(wordFile);
                // Show the resulting Word document.
                if (result == 0)
                {
                    System.Diagnostics.Process.Start(wordFile);

                }
            }
        }

        private void barButtonItem2_ItemClick(object sender, ItemClickEventArgs e)
        {
            string pathToPdf = pdfViewer.DocumentFilePath.ToString();
            string pathToExcel = Path.ChangeExtension(pathToPdf, ".xls");

            // Convert PDF file to Excel file
            SautinSoft.PdfFocus f = new SautinSoft.PdfFocus();

            // This property is necessary only for registered version
            //f.Serial = "XXXXXXXXXXX";

            // 'true' = Convert all data to spreadsheet (tabular and even textual).
            // 'false' = Skip textual data and convert only tabular (tables) data.
            f.ExcelOptions.ConvertNonTabularDataToSpreadsheet = true;

            // 'true'  = Preserve original page layout.
            // 'false' = Place tables before text.
            f.ExcelOptions.PreservePageLayout = true;

            f.OpenPdf(pathToPdf);

            if (f.PageCount > 0)
            {
                int result = f.ToExcel(pathToExcel);

                //Open a produced Excel workbook
                if (result == 0)
                {
                    System.Diagnostics.Process.Start(pathToExcel);
                }
            }
        }

        private void barButtonItem4_ItemClick(object sender, ItemClickEventArgs e)
        {
            string pdfFile = pdfViewer.DocumentFilePath.ToString();
            string htmlFile = Path.ChangeExtension(pdfFile, ".htm");

            // Convert PDF file to HTML file
            SautinSoft.PdfFocus f = new SautinSoft.PdfFocus();

            // Path (must exist) to a directory to store images after converting. Notice also to the property "ImageSubFolder".
            f.HtmlOptions.ImageFolder = Path.GetDirectoryName(pdfFile);
            // A folder (will be created by the component) without any drive letters, only the folder as "myfolder".
            f.HtmlOptions.ImageSubFolder = String.Format("{0}_images", Path.GetFileNameWithoutExtension(pdfFile));
            // We recommend to use PNG type for storing images.
            f.HtmlOptions.ImageType = PdfFocus.CHtmlOptions.eHtmlImageType.Png;
            // How to store images: Inside HTML document as base64 images or as linked separate image files.
            f.HtmlOptions.IncludeImageInHtml = false;
            // Set <title>...</title>
            f.HtmlOptions.Title = "Simple text";

            // After purchasing the license, please insert your serial number here to activate the component:
            //f.Serial = "123456789";

            f.OpenPdf(pdfFile);

            if (f.PageCount > 0)
            {
                int result = f.ToHtml(htmlFile);

                // Show resulted HTML document in a browser.
                if (result == 0)
                {
                    System.Diagnostics.Process.Start(htmlFile);
                }
            }
        }

        private void barButtonItem5_ItemClick(object sender, ItemClickEventArgs e)
        {
            string pdfFile = pdfViewer.DocumentFilePath.ToString();
            string textFile = Path.ChangeExtension(pdfFile, ".txt");

            //Convert PDF file to Text file
            SautinSoft.PdfFocus f = new SautinSoft.PdfFocus();
            //this property is necessary only for registered version
            //f.Serial = "XXXXXXXXXXX";

            f.OpenPdf(pdfFile);

            if (f.PageCount > 0)
            {
                int result = f.ToText(textFile);

                //Show Text document
                if (result == 0)
                {
                    System.Diagnostics.Process.Start(textFile);
                }




            }
        }

        private void barButtonItem6_ItemClick(object sender, ItemClickEventArgs e)
        {
            string pathToPdf = pdfViewer.DocumentFilePath.ToString();
            string pathToXml = Path.ChangeExtension(pathToPdf, ".xml");

            // Convert PDF file to XML file.
            SautinSoft.PdfFocus f = new SautinSoft.PdfFocus();

            // This property is necessary only for registered version.
            //f.Serial = "XXXXXXXXXXX";

            // Let's convert only tables to XML and skip all textual data.
            f.XmlOptions.ConvertNonTabularDataToSpreadsheet = false;

            f.OpenPdf(pathToPdf);

            if (f.PageCount > 0)
            {
                int result = f.ToXml(pathToXml);

                //Show HTML document in browser
                if (result == 0)
                {
                    System.Diagnostics.Process.Start(pathToXml);
                }
            }

        }

        private void barButtonItem7_ItemClick(object sender, ItemClickEventArgs e)
        {
            // Convert PDF to JPG with high Quality
            SautinSoft.PdfFocus f = new SautinSoft.PdfFocus();

            // This property is necessary only for registered version
            // f.Serial = "XXXXXXXXXXX";
            string pdfFile = pdfViewer.DocumentFilePath.ToString();
            string jpegDir = Path.GetDirectoryName(pdfFile);

            f.OpenPdf(pdfFile);

            if (f.PageCount > 0)
            {
                // Set image properties: Jpeg, 200 dpi
                f.ImageOptions.ImageFormat = System.Drawing.Imaging.ImageFormat.Jpeg;
                f.ImageOptions.Dpi = 200;

                // Set 95 as JPEG quality
                f.ImageOptions.JpegQuality = 95;

                //Save all PDF pages to image folder, each file will have name Page 1.jpg, Page 2.jpg, Page N.jpg
                for (int page = 1; page <= f.PageCount; page++)
                {
                    string jpegFile = Path.Combine(jpegDir, String.Format("Page {0}.jpg", page));

                    // 0 - converted successfully                
                    // 2 - can't create output file, check the output path
                    // 3 - conversion failed
                    int result = f.ToImage(jpegFile, page);

                    // Show only 1st page
                    if (page == 1 && result == 0)
                        System.Diagnostics.Process.Start(jpegFile);
                }
            }

        }

        private void richTextBox1_TextChanged(object sender, EventArgs e)
        {
           
        }
    }
}





