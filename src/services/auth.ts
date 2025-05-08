// In a real app, this would call your backend API
export const mockLogin = async (username: string, password: string) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Simple mock validation
    if (password === 'password') {
      return { success: true, username };
    }
    return { success: false, error: 'Invalid credentials' };
  };
  
  export const mockLogout = async () => {
    await new Promise(resolve => setTimeout(resolve, 200));
    return { success: true };
  };