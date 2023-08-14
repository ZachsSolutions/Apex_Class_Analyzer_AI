public with sharing class ApexClassController {
    @AuraEnabled(cacheable=true)
    public static List<String> getApexClassNames() {
        List<String> classNames = new List<String>();
        
        for (ApexClass cls : [SELECT Name FROM ApexClass WHERE NamespacePrefix = '']) {
            classNames.add(cls.Name);
        }
        
        return classNames;
    }

    @AuraEnabled(cacheable=true)
    public static String getApexClassBody(String className) {
        ApexClass cls = [SELECT Body FROM ApexClass WHERE Name = :className];
        return cls.Body;
    }
}
