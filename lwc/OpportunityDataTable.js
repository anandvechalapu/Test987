// OpportunityDataTable.js
import { LightningElement, api } from 'lwc';
import getOpenOpportunities from '@salesforce/apex/OpportunityController.getOpenOpportunities';

export default class OpportunityDataTable extends LightningElement {
    @api opportunities;
    @api totalNumberOfRows;

    // Search fields
    searchName;
    searchStage;
    searchAmount;
    searchClosingDate;

    // Table columns
    columns = [
        { label: 'Opportunity Name', fieldName: 'Name'},
        { label: 'Opportunity Owner', fieldName: 'Opportunity_Owner__r.Name'},
        { label: 'Stage', fieldName: 'StageName'},
        { label: 'Amount', fieldName: 'Amount', type: 'currency'},
        { label: 'Close Date', fieldName: 'CloseDate', type: 'date'}
    ];

    // Table sorts
    sortBy = 'Name';
    sortDirection = 'asc';

    // Page size
    pageSize = 10;

    // Get Opportunities on initial render
    connectedCallback(){
        this.getOpportunities();
    }

    // Method to get Opportunities
    getOpportunities(){
        getOpenOpportunities()
        .then(result => {
            this.opportunities = result;
            this.totalNumberOfRows = result.length;
        })
        .catch(error => {
            this.error = error;
        });
    }

    // Handle search
    handleSearch(event){
        this.searchName = event.detail.Name;
        this.searchStage = event.detail.StageName;
        this.searchAmount = event.detail.Amount;
        this.searchClosingDate = event.detail.CloseDate;
    }

    // Handle sort
    handleSort(event){
        this.sortBy = event.detail.fieldName;
        this.sortDirection = event.detail.sortDirection;
    }
}