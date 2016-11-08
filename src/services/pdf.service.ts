/**
 * Created by Python on 11/7/2016.
 */
import { Injectable } from '@angular/core';
declare var jsPDF:any;

@Injectable()
export class PDFService {

    public doc;

    constructor() {
    }
    createDoc(){
        this.doc = new jsPDF();
        this.doc.text('Hello world!', 10, 10);
        this.doc.save('a4.pdf')
    }
    createHtml(ele){
        this.doc = new jsPDF('landscape');
        // We'll make our own renderer to skip this editor
        var specialElementHandlers = {
            '#editor': function(element, renderer){
                return true;
            }
        };

        let margins = {
            top: 80,
            bottom: 60,
            left: 40,
            width: 522
        };

        // All units are in the set measurement for the document
        // This can be changed to "pt" (points), "mm" (Default), "cm", "in"
        this.doc.fromHTML(ele, margins.left,margins.top,
            {
            'width': margins.width,
            'elementHandlers': specialElementHandlers
        });

        //this.doc.save('a4.pdf')


    }

    saveTable(columns,data){
        var doc = new jsPDF('p', 'pt');
        doc.autoTable(columns, data);
        doc.save("table.pdf");
    }

}