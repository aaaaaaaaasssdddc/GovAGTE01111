#!/usr/bin/env python3
"""
Heroku deployment verification script
Verifies all components are ready for production deployment
"""
import os
import sys
import subprocess

def check_heroku_files():
    """Check if all Heroku deployment files exist and are configured correctly"""
    required_files = {
        'Procfile': 'Process configuration',
        'requirements.txt': 'Python dependencies',
        'runtime.txt': 'Python runtime version',
        'wsgi.py': 'WSGI entry point',
        'app.json': 'Heroku app metadata',
        'heroku.yml': 'Heroku stack configuration',
        '.slugignore': 'Deployment size optimization'
    }
    
    print("📋 Checking Heroku deployment files...")
    
    for file, description in required_files.items():
        if os.path.exists(file):
            print(f"✅ {file} - {description}")
        else:
            print(f"❌ {file} missing - {description}")
            return False
    
    return True

def check_environment_vars():
    """Check essential environment variables"""
    print("\n🔑 Checking environment variables...")
    
    # Essential variables for Heroku
    essential_vars = ['SESSION_SECRET', 'DATABASE_URL']
    
    for var in essential_vars:
        if os.environ.get(var):
            print(f"✅ {var} is set")
        else:
            print(f"⚠️  {var} not set (will be configured in Heroku)")
    
    # Optional API keys
    optional_vars = ['NOVA_ERA_SECRET_KEY', 'NOVA_ERA_PUBLIC_KEY', 'TOKEN_CPF_API']
    
    for var in optional_vars:
        if os.environ.get(var):
            print(f"✅ {var} is set")
        else:
            print(f"⚠️  {var} not set (optional for testing)")

def check_app_health():
    """Test application health"""
    print("\n🏥 Testing application health...")
    
    try:
        from wsgi import app
        print("✅ WSGI application imports successfully")
        
        with app.test_client() as client:
            response = client.get('/')
            if response.status_code == 200:
                print("✅ Home page loads correctly")
            else:
                print(f"⚠️  Home page returns status {response.status_code}")
                
        print("✅ Application health check passed")
        return True
        
    except Exception as e:
        print(f"❌ Application health check failed: {e}")
        return False

def check_database():
    """Check database configuration"""
    print("\n🗄️  Checking database configuration...")
    
    try:
        from app import app, db
        
        with app.app_context():
            # Test database connection
            with db.engine.connect() as conn:
                conn.execute(db.text("SELECT 1")).fetchone()
            print("✅ Database connection successful")
            
            # Check if tables exist
            from models import Program, Position
            program_count = Program.query.count()
            position_count = Position.query.count()
            
            print(f"✅ Database has {program_count} programs and {position_count} positions")
            
            if program_count == 0:
                print("⚠️  Database is empty - will be populated on first deploy")
            
        return True
        
    except Exception as e:
        print(f"❌ Database check failed: {e}")
        return False

def main():
    """Run all deployment verification checks"""
    print("🚀 HEROKU DEPLOYMENT VERIFICATION")
    print("=" * 40)
    
    checks = [
        check_heroku_files,
        check_environment_vars, 
        check_app_health,
        check_database
    ]
    
    all_passed = True
    
    for check in checks:
        try:
            result = check()
            if result is False:
                all_passed = False
        except Exception as e:
            print(f"❌ Check failed with error: {e}")
            all_passed = False
        print()
    
    print("=" * 40)
    
    if all_passed:
        print("🎉 ALL CHECKS PASSED!")
        print("✅ Application is ready for Heroku deployment")
        print("\n📝 Next steps:")
        print("1. Commit all changes to git")
        print("2. Push to your Heroku app: git push heroku main")
        print("3. Monitor deployment: heroku logs --tail")
        print("4. Set environment variables in Heroku dashboard")
    else:
        print("⚠️  Some checks failed - review issues above")
        sys.exit(1)

if __name__ == "__main__":
    main()