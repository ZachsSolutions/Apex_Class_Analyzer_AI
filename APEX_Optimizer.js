import { LightningElement, wire, track } from 'lwc';
import getApexClassNames from '@salesforce/apex/ApexClassController.getApexClassNames';
import getApexClassBody from '@salesforce/apex/ApexClassController.getApexClassBody';


export default class ApexClassPicker extends LightningElement {
    selectedClass = '';
    classOptions = [];
    @track prompt = '';
    @track response = '';
    @track isWaiting = false;


    @wire(getApexClassNames)
    wiredApexClasses({ data, error }) {
        if (data) {
            this.classOptions = data.map(className => ({ label: className, value: className }));
        } else if (error) {
            console.error('Error fetching Apex classes:', error);
        }
    }

    handleClassChange(event) {
        this.selectedApexClass = event.detail.value;
        getApexClassBody({ className: this.selectedApexClass })
            .then(body => {
                this.prompt = `Can you please review the following Apex class and let me know if there are any issues? If everything looks good, please respond with 'Yes' :\n\nClass: ${this.selectedApexClass}\n\n${body}`;
                console.log('Constructed Prompt:', this.prompt);
            })
            .catch(error => {
                console.error('Error fetching Apex class body:', error);
            });
    }



    
    async sendRequest() {
        this.isWaiting = true;
        
        const apiUrl = 'https://api.openai.com/v1/engines/davinci/completions'; // Correct API endpoint
        const apiKey = 'YOUR_API_KEY'; // Replace with your actual API key
    
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        };
    //alert('i am here');
        const requestBody = {
            prompt: this.prompt,
            max_tokens: 1000,
            temperature: 1.0,
            
            frequency_penalty: 0,
            presence_penalty: 0
        };
        //alert(this.prompt);
    
        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(requestBody)
            });
    
            const responseData = await response.json();
            //alert('we are here now' ,responseData.choices[0].text);
            this.response = responseData.choices[0].text.replace(/\n/g, '<br>');; // Adjust this based on your API response structure
            console.log(responseData);
            console.log(responseData.choices[0]);
            console.log(responseData.choices[0].text);
        } catch (error) {
            console.error('Error:', error);
            alert('i am here now');
        }
    
        this.isWaiting = false;
    }
}
