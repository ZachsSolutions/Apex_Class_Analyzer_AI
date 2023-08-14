# Apex_Class_Analyzer_AI
This is an LWC that sends custom Apex class code to be analyzed for technical improvements from OpenAI's completion API.  

This tool uses an APEX controller to get a list of APEX classes without a namespace.  These can be generally assumed to be custom classes. 

Once selected the tool makes a callout to the OPENAPI Copmletions API with a prompt asking to determine whether there are any issues with the class itself.  If there are no problems the API should theoretically return a 'YES'
However the responses from this API are not as good as one woud hope for.  The issue may have to do with the relative length of the prompt requests.  However from the ChatGPT UI there seems to be no real issue with something of similar length. 
The issue may lie within the request parameters.  The responses that I have generated with the existing params (and having fiddled around considerably) are mainly non-sensical. 

Please feel free to submit a PR if you have ideas on how to improve the response quality. 

<img width="197" alt="image" src="https://github.com/ZachsSolutions/Apex_Class_Analyzer_AI/assets/52823904/44ae0fa9-1bab-4f75-b0c1-2ea71ab062db">
