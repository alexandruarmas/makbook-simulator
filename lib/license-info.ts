export const printLicenseInfo = () => {
  const headerStyle = [
    'color: #ffffff',
    'background: #2ecc71',
    'padding: 12px 20px',
    'border-radius: 4px',
    'font-size: 14px',
    'font-weight: bold',
    'text-shadow: 0 1px 1px rgba(0,0,0,0.2)',
    'margin: 20px 0'
  ].join(';');

  const contentStyle = [
    'color: #2c3e50',
    'background: #ecf0f1',
    'padding: 15px',
    'border-radius: 4px',
    'font-size: 13px',
    'line-height: 1.5',
    'border: 1px solid #bdc3c7'
  ].join(';');

  // Print header
  console.log('%c🔒 MakBook Simulator License Information', headerStyle);
  
  // Print content
  console.log(
    '%c' + 
    `MakBook Simulator By Alexandru Armaș
Copyright 2024 Alexandru Armaș

Licensed under the Apache License, Version 2.0
You may obtain a copy of the License at:
http://www.apache.org/licenses/LICENSE-2.0

This product includes software developed by Alexandru Armaș.
For more information, see the NOTICE file in the project root.`,
    contentStyle
  );
}; 